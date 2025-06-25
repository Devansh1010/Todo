import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { dbConnect } from "./lib/dbConnect";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {
          type: "email",
          label: "Email",
          placeholder: "john@example.com",
        },
        password: {
          type: "password",
          label: "Password",
          placeholder: "******",
        },
      },
      
      authorize: async (credentials: any): Promise<any> => {

        await dbConnect();
        const User = (await import("@/models/User.model")).default;

        try {
          
          const user = await User.findOne({
            $or: [
              { email: credentials.email },
              { username: credentials.email }
            ]
          })


          if (!user) {
            throw new Error("No user found")
          }

          const isValid = await bcrypt.compare(credentials.password, user.password)

          if (isValid) {
            return user 
          } else {
            throw new Error("Invalid Credentials")
          }


        } catch (error: any) {

          console.error("Authorization Error:", error.message);
          throw new Error(error)
        }
      },
    }),

    Google,
  ],

  callbacks: {
    async jwt({ token, user }) {
      // user is only available on login
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = (user as any).role;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        (session.user as any).role = token.role;
      }

      return session;
    },
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60,
  },

  secret: process.env.AUTH_SECRET,
});
