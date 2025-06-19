import { z } from 'zod'
import { usernameValidation } from './signUpValidation'

export const signInValidation = z.object({
    username: usernameValidation,
    email: z.string().email(),
    password: z.string().min(6),
})