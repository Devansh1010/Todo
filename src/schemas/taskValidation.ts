import { z } from 'zod'
import { UserRole } from '@/models/UserRole';

export const SubTaskSchema = z.object({
    title: z.string().min(2, "Subtask title required minmum 2 characters"),
    isCompleted: z.boolean().optional().default(false),
});

export const taskSchemaValidation = z.object({
    title: z.string()
        .min(2, "Minimum Two characters required in the task title")
        .max(30, "Title can't be longer than 30 charcters."),

    description: z.string()
        .max(200, "Description can't be longer than 200 characters.")
        .optional(),

    createdBy: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid user ID"),


    assignedTo: z.array(
        z.object({
            user: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid user ID"),
            role: z.nativeEnum(UserRole).default(UserRole.Member),
        })
    ).optional(),

    teamId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid team ID").optional(),


    assignedTeams: z.array(
        z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid team ID")
    ).optional(),

    dueDate: z.coerce.date().optional(),

    status: z.enum(['todo', 'in-progress', 'done', 'archived']).default('todo'),

    priority: z.enum(['low', 'medium', 'high', 'urgent']).default('medium'),

    subTasks: z.array(SubTaskSchema).optional()
})