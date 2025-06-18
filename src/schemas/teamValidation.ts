import {z} from 'zod'

const memberSchema = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId");


const teamValidation = z.object({
    name: z.string()
    .min(1, "Team name is required"),

    workspaceId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid workspace ID"),

    createdBy:   z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid user ID"),

    members: z.array(memberSchema).optional()
})