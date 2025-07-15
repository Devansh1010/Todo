import mongoose, { Schema, Document } from 'mongoose';
import { UserRole } from '@/models/UserRole';
import { USER_ROLES } from '@/models/UserRole';

export interface Membership {
  project: mongoose.Types.ObjectId;
  role: UserRole;
  joinAt: Date;
  isAccepted: boolean
}

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  profilePicture?: string;
  projects: mongoose.Types.ObjectId[];
  membership: Membership[]
  tasks: mongoose.Types.ObjectId[];
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

  projects: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Project',
    },
  ],

  tasks: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Task',
    },
  ],

  membership: [
    {

      project: {
        type: Schema.Types.ObjectId,
        ref: "Project",
      },
      role: {
        type: String,
        enum: USER_ROLES,
        required: true,
        default: 'member',
      },

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
