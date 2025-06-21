import NextAuth, { type DefaultSession } from "next-auth"
import { ZodError } from "zod"
import Credentials from "next-auth/providers/credentials"
import { signInValidation } from "@/schemas/signInValidation"
import bcrypt from "bcryptjs"
import User from "@/models/User.model"


import Google from "next-auth/providers/google"

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

export const { handlers, auth } = NextAuth({
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
      authorize: async (credentials) => {
        try {
          if (!credentials || !credentials.username || !credentials.password) {
            throw new Error("Username and password are required")
          }

          const { username, password } = await signInValidation.parseAsync(credentials)

          //aggregation query to find user by username or email
          const user = await User.findOne({
            $or: [
              { username: username },
              { email: username }
            ]
          }).exec()



          if (!user) {
            throw new Error("No user found with this email")

          }

          const isValid = await bcrypt.compare(password, user.password)

          console.log("User found:", user)

          if (!isValid) {
            throw new Error("Invalid Password")
          }

          return user

        } catch (error) {
          if (error instanceof ZodError) {
            return null
          }
          return null;
        }

      },
    }),

    Google,

  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.username = user.name
        token.email = user.email
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.name = token.username as string
        session.user.email = token.email as string
      }
      return session
    },
  },
})