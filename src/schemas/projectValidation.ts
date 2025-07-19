import { z } from "zod";

export const DProjectSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  description: z.string().min(1, "Project description is required"),
  // members: z.array(z.string().min(1, "Member ID must be a string")),
  templetes: z.array(
    z.enum(["kanban", "todo", "calendar", "announcements"])
  ),
});
