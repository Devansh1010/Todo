import mongoose, { Schema, Document, ObjectId } from 'mongoose'
import { USER_ROLES, UserRole } from './UserRole'





export interface Workspace extends Document {
    name: string,
    description?: string,
    createdBy: ObjectId,

    members: [ // optional quick lookup 
        {
            userId: ObjectId,
            role: UserRole,
            joinedAt: Date
        }
    ],

    deletedTasks: [ // soft-deleted tasks, purge after 3 days
        {
            taskId: ObjectId,
            deletedAt: Date
        }
    ],

    settings: {
        theme?: string,
        enableNotifications?: boolean,
        autoArchiveAfterDays?: number
    },

    inviteTokens: [ // Optional — for shareable links
        {
            token: string,
            role: UserRole,
            expiresAt: Date
        }
    ]
}

const workspaceSchema = new Schema<Workspace>({
    name: {
        type: String,
        required: [true, "Workspace Required"]
    },

    description: {
        type: String
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "Username reqired"]
    },

    members: [ 
        {
            userId: {
                type: Schema.Types.ObjectId,
                ref: "User"
            },

            role: { type: UserRole },

            joinedAt: Date
        }
    ],

    deletedTasks: [
        {
            taskId: {
                type: Schema.Types.ObjectId,
                ref: 'Task'
            },

            deletedAt: Date
        }
    ],

    settings: {
        theme: {
            type: String,

        },
        enableNotifications: {
            type: Boolean
        },

        autoArchiveAfterDays: {
            type: Number
        }
    },

    inviteTokens: [ // Optional 
        {
            token: {
                type: String

            },

            role: {
                type: UserRole,
                enum: USER_ROLES,
                required: true,
                default: 'member'
            },

            expiresAt: Date
        }
    ]
})

const WorkspaceModel = mongoose.models.Workspace || mongoose.model<Workspace>('Workspace', workspaceSchema);
export default WorkspaceModel;