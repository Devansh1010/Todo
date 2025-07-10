import mongoose, { Schema, Document, Types } from 'mongoose';
import { USER_ROLES, UserRole } from './UserRole';

export interface Members {
  userId: Types.ObjectId,
  name: string,
  role: UserRole,
  joinedAt: Date

}
export interface Inviteduser {
  userId: Types.ObjectId,
  name: string,
  role: UserRole,
}

export interface Task {
  task: Types.ObjectId
}

export interface Project extends Document {
  name: string;
  description?: string;
  createdBy: Types.ObjectId;
  members: Members[]
  invitedUser?: Inviteduser[]
  tasks: Task[]
}

const projectSchema: Schema<Project> = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Project name is required'],
    },

    description: {
      type: String,
      default: ''
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Creator (createdBy) is required'],
    },

    tasks: [
      {
        task: {
          type: Schema.Types.ObjectId,
          ref: "Task"
        }
      }
    ],

    members: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        name: {
          type: String,
          required: [true, 'User name is required'],
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
        name: {
          type: String,
          required: [true, 'Invited user name is required'],
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
      }
    ]


  },

  { timestamps: true }
);

const ProjectModel =
  mongoose.models.Project ||
  mongoose.model<Project>('Project', projectSchema);

export default ProjectModel;
