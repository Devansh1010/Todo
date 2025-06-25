import { z } from "zod";
import { USER_ROLES } from "@/models/UserRole";

// Zod Enum from your USER_ROLES
const UserRoleEnum = z.enum(USER_ROLES as [string, ...string[]]);

// Validate MongoDB ObjectId (string form)
const objectId = z.string().min(1, "Invalid ObjectId");

// Main Zod Schema
export const workspaceSchemaValidation = z.object({
  name: z.string().min(2, "Workspace name is required"),
  description: z.string().optional(),
  createdBy: objectId,

  members: z.array(
    z.object({
      userId: objectId,
      role: UserRoleEnum,
      joinedAt: z.date().optional(),
    })
  ).optional(),

  deletedTasks: z.array(
    z.object({
      taskId: objectId,
      deletedAt: z.date().optional(),
    })
  ).optional(),

  settings: z.object({
    theme: z.string().optional(),
    enableNotifications: z.boolean().optional(),
    autoArchiveAfterDays: z.number().optional(),
  }).optional(),

  inviteTokens: z.array(
    z.object({
      token: z.string(),
      role: UserRoleEnum,
      expiresAt: z.date(),
    })
  ).optional(),
});
