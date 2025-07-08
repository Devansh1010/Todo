import mongoose, { Schema, type Document } from "mongoose"
import { UserRole } from "./UserRole"

export interface SubTask {
  title: string
  isCompleted: boolean
}

export interface AssignedTo {
  user: mongoose.Types.ObjectId
  role: UserRole
}

export interface Task extends Document {
  title: string
  description?: string
  createdBy: mongoose.Types.ObjectId
  project: mongoose.Types.ObjectId

  assignedTo?: AssignedTo[]
  dueDate?: Date
  status: "todo" | "in-progress" | "done" | "archived"
  priority: "low" | "medium" | "high" | "urgent"
  subTasks?: SubTask[]
  createdAt?: Date
  updatedAt?: Date
}

const subTaskSchema: Schema<SubTask> = new Schema({
  title: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
})

const taskSchema: Schema<Task> = new Schema(
  {
    title: {
      type: String,
      required: [true, "Task title is required"],
    },
    description: {
      type: String,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },

    assignedTo: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        role: {
          type: String,
          enum: Object.values(UserRole),
          default: UserRole.Member,
        },
      },
    ],

    dueDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["todo", "in-progress", "done", "archived"],
      default: "todo",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high", "urgent"],
      default: "medium",
    },
    subTasks: [subTaskSchema],
  },
  { timestamps: true },
)

const TaskModel = mongoose.models.Task || mongoose.model<Task>("Task", taskSchema)

export default TaskModel
