import mongoose, { Schema, Document, Types } from 'mongoose';
import { USER_ROLES, UserRole } from './UserRole';
import { Type } from 'lucide-react';
import { isAborted } from 'zod';

export interface Workspace extends Document {
  name: string;
  description?: string;
  createdBy: Types.ObjectId;

  members: Array<{
    userId: Types.ObjectId;
    role: UserRole;
    joinedAt: Date;
  }>;

  deletedTasks: Array<{
    taskId: Types.ObjectId;
    deletedAt: Date;
  }>;

  settings?: {
    theme?: string;
    enableNotifications?: boolean;
    autoArchiveAfterDays?: number;
  };

  invitedUser?: Array<{
    userId: Types.ObjectId
    role: UserRole;
    isAccepted: boolean 
  }>;

  teams?: Array<{
    teamId: Types.ObjectId;
  }>;
}

const workspaceSchema: Schema<Workspace> = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Workspace name is required'],
    },

    description: {
      type: String,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Creator (createdBy) is required'],
    },

    members: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        role: {
          type: String,
          enum: USER_ROLES,
          default: 'member',
          required: true,
        },
        joinedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    invitedUser: [
      {
        userId: {
          type: Types.ObjectId,
          ref: "User"
        },
        role: {
          type: String,
          enum: USER_ROLES,
          default: 'member',
          required: true,
        },

        isAccepted: {
          type: Boolean,
          default: false
        }
      },
    ],

    deletedTasks: [
      {
        taskId: {
          type: Schema.Types.ObjectId,
          ref: 'Task',
          required: true,
        },
        deletedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    settings: {
      theme: { type: String },
      enableNotifications: { type: Boolean, default: true },
    },


    teams: [
      {
        teamId: {
          type: Schema.Types.ObjectId,
          ref: 'Team',
        }
      }
    ]
  },
  { timestamps: true }
);

const WorkspaceModel =
  mongoose.models.Workspace ||
  mongoose.model<Workspace>('Workspace', workspaceSchema);

export default WorkspaceModel;
