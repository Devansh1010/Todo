import NextAuth from "next-auth"
import { ZodError } from "zod"
import Credentials from "next-auth/providers/credentials"
import { signInValidation } from "@/schemas/signInValidation"
import bcrypt from "bcryptjs"
import User from "@/models/User.model"

import Google from "next-auth/providers/google"

export const { handlers, auth } = NextAuth({
  providers: [
    Credentials({

      credentials: {
        username: {
          type: "text",
          label: "Username",
          placeholder: "John Wick"
        },

        email: {
          type: "email",
          label: "Email",
          placeholder: "john@example.com"
        },
        password: {
          type: "password",
          label: "Password",
          placeholder: "******"
        },

      },
      authorize: async (credentials) => {
        try {
          let user = null

          const { username, email, password } = await signInValidation.parseAsync(credentials)

          user = await User.findOne({ email }) //add aggregation pipeline for match username and email

          if (!user) {
            throw new Error("No user found with this email")
          }

          const isValid = await bcrypt.compare(password, user.password)

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

    Google
  ],
})