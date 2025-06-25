import mongoose, { Schema, Document } from 'mongoose';
import { UserRole } from '@/models/UserRole';
import { USER_ROLES } from '@/models/UserRole';

export interface Membership {
  userId: mongoose.Types.ObjectId
  workspaceId: mongoose.Types.ObjectId;
  teamsId: mongoose.Types.ObjectId[];
  role: UserRole;
  joinAt: Date;
}

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  profilePicture?: string;
  workspaceId: mongoose.Types.ObjectId;
  isAccepted: boolean;
  membership: Membership[]
}

const UserSchema: Schema<User> = new Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    trim: true,
    unique: true
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

  workspaceId: [{
    type: Schema.Types.ObjectId,
    ref: 'Workspace',
  }],

  membership: [
    {
      userId: {
        type: mongoose.Types.ObjectId,
        ref: "User"
      },
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

      isAccepted: {
        type: Boolean,
        default: false
      },

      joinAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
},
  { timestamps: true }
);


const UserModel = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>('User', UserSchema));
export default UserModel;
