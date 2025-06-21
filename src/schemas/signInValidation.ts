import { z } from 'zod'
import { usernameValidation } from './signUpValidation'

export const signInValidation = z.object({
    username: z.string().min(2, "Username must be at least 2 characters long"),
    password: z.string().min(6),
})