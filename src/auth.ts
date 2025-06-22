import NextAuth, { type DefaultSession } from "next-auth"
import { ZodError } from "zod"
import Credentials from "next-auth/providers/credentials"

import bcrypt from "bcryptjs"
import User from "@/models/User.model"


import Google from "next-auth/providers/google"
import { dbConnect } from "./lib/dbConnect"
import { string } from "zod/v4"

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      id: string
      /**
       * By default, TypeScript merges new interface properties and overwrites existing ones.
       * In this case, the default session user properties will be overwritten,
       * with the new ones defined above. To keep the default session user properties,
       * you need to add them back into the newly declared interface.
       */
    } & DefaultSession["user"]
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({

      credentials: {
        username: {
          type: "text",
          label: "Username",
          placeholder: "Enter Username or Email"
        },
        password: {
          type: "password",
          label: "Password",
          placeholder: "******"
        },

      },
      authorize: async (credentials: any): Promise<any> => {

        await dbConnect()

        try {

          if (!credentials || !credentials.identifier.username || !credentials.identifier.password) {
            throw new Error("Username and password are required")
          }

          //aggregation query to find user by username or email
          const user = await User.findOne({
            $or: [
              { username: credentials.identifier.username },
              { email: credentials.identifier.username }
            ]
          }).exec()

          if (!user) {
            throw new Error("No user found with this email")

          }

          const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)

          console.log("User found:", user)
          console.log("credentials: ", credentials)

          if (!isPasswordCorrect) {
            throw new Error("Invalid Password")
          }

          return user

        } catch (error: any) {
            throw new Error(error)
        }

      },
    }),

    Google,

  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString()
        token.username = user.username,
        token.email = user.email
        token.role = user.role
      }

      return token
    },
    async session({ session, token }) {

      if (token) {
        session.user._id = token.id as string,
        session.user.username = token.username  as string,
        session.user.email = token.email as string,
        session.user.role = token.role as string
      }
      return session
    },
  },

  pages: {
    signIn: "sign-in"
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60
  },

  secret: process.env.AUTH_SERECT
})