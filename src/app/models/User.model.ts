import mongoose, { Schema, Document, ObjectId, now } from 'mongoose'
import { UserRole } from '@/app/models/UserRole'
import { USER_ROLES } from '@/app/models/UserRole'; 

export interface User extends Document {

    username: string,
    email: string,
    password: string,
    profilePeacture: string,
    membership: [{
        workspaceId: mongoose.Types.ObjectId,
        role: UserRole,
        teamsId: [mongoose.Types.ObjectId],
        joinAt: Date
    }]
}

const userSchema = new Schema({

    username: {
        type: String,
        required: [true, "Username is Required"],
    },

    email: {
        type: String,
        required: [true, "Email is Required"],
        unique: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Please Enter valid email"]
    },
    password: {
        type: String,
        required: true
    },
    profilePeacture: {
        type: String,
    },
    membership: [{
        workspaceId: {
            type: Schema.Types.ObjectId,
            ref: 'Workspace'

        },
        role: {
            type: String,
            enum: USER_ROLES,
            default: 'member'
        },
        teamsId: [{
            type: Schema.Types.ObjectId,
            ref: 'Teams'
        }],

        joinAt: {
            type: Date,
            default: Date.now
        }

    }]

}, { timestamps: true })


const UserModel = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>('User', userSchema))

export default UserModel