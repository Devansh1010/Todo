import mongoose, { Schema, Document } from 'mongoose';
import { UserRole } from './UserRole';

export interface SubTask {
  title: string;
  isCompleted: boolean;
}

export interface Task extends Document {
  title: string;
  description?: string;
  createdBy: mongoose.Types.ObjectId;
  workspaceId: mongoose.Types.ObjectId;
  teamId: mongoose.Types.ObjectId;
  assignedTo?: {
    user: mongoose.Types.ObjectId;
    role: UserRole
  }[];
  assignedTeams?: mongoose.Types.ObjectId[];
  dueDate?: Date;
  status: 'todo' | 'in-progress' | 'done' | 'archived';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  subTasks?: SubTask[];
}

const subTaskSchema = new Schema<SubTask>({
  title: {
    type: String,
    required: true
  },

  isCompleted: {
    type: Boolean,
    default: false
  }
});

const taskSchema = new Schema<Task>({
  title: {
    type: String,
    required: [true, 'Task title is required']
  },

  description: {
    type: String
  },

  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  workspaceId: {
    type: Schema.Types.ObjectId,
    ref: 'Workspace',
    required: true
  },

  teamId: {
    type: Schema.Types.ObjectId,
    ref: 'Team',
    required: true
  },

  assignedTo: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    role: {
      type: String,
      enum: UserRole,
      default: 'executor'
    }
  }],

  assignedTeams: [{
    type: Schema.Types.ObjectId,
    ref: 'Team'
  }],

  dueDate: {
    type: Date
  },

  status: {
    type: String,
    enum: ['todo', 'in-progress', 'done', 'archived'],
    default: 'todo'
  },

  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },

  subTasks: [subTaskSchema]

}, { timestamps: true });

const TaskModel = mongoose.models.Task || mongoose.model<Task>('Task', taskSchema);
export default TaskModel; 
