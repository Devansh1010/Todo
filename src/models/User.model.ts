import mongoose, { Schema, Document } from 'mongoose';
import { UserRole } from '@/models/UserRole';
import { USER_ROLES } from '@/models/UserRole';

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  profilePicture?: string;
  membership: Array<{
    workspaceId: mongoose.Types.ObjectId;
    teamsId: mongoose.Types.ObjectId[];
    role: UserRole;
    joinAt: Date;
  }>;
}

const userSchema = new Schema<User>(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
    },

    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Please enter a valid email',
      ],
    },

    password: {
      type: String,
      required: true,
    },

    profilePicture: {
      type: String,
    },

    membership: [
      {
        workspaceId: {
          type: Schema.Types.ObjectId,
          ref: 'Workspace',
        },
        role: {
          type: String,
          enum: USER_ROLES,
          required: true,
          default: 'member',
        },
        teamsId: [
          {
            type: Schema.Types.ObjectId,
            ref: 'Teams',
          },
        ],
        joinAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);


const UserModel = mongoose.models.User || mongoose.model<User>('User', userSchema);

export default UserModel;
