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
      authorize: async (credentials) => {
        try {
          await dbConnect();

          if (!credentials?.email || !credentials?.password) {
            throw new Error("Please provide both email and password");
          }

          const User = (await import("./models/User.model")).default;

          const user = await User.findOne({ email: credentials.email });

          if (!user) {
            throw new Error("No user found with this email");
          }

          const password = credentials.password as string

          const isvalid = await bcrypt.compare(password, user.password)

          if (!isvalid) {
            throw new Error("Invalid password");
          }

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.username, // If you use a username
            role: user.role || "member", // If you're tracking role
          };
        } catch (error: any) {
          console.error("Authorization Error:", error.message);
          return null;
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
  },

  secret: process.env.AUTH_SECRET,
});
