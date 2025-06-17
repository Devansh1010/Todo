import mongoose, { Schema, Document } from 'mongoose';

export interface Reminder extends Document {
  title: string;
  note?: string;
  userId: mongoose.Types.ObjectId;
  taskId?: mongoose.Types.ObjectId; // Optional
  workspaceId: mongoose.Types.ObjectId;
  remindAt: Date;
  repeat?: 'none' | 'daily' | 'weekly' | 'monthly';
  isActive: boolean;
  createdAt: Date;
}

const reminderSchema = new Schema<Reminder>({
  title: {
    type: String,
    required: true
  },

  note: String,
  
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  taskId: {
    type: Schema.Types.ObjectId,
    ref: 'Task',
    default: null
  },

  workspaceId: {
    type: Schema.Types.ObjectId,
    ref: 'Workspace',
    required: true
  },

  remindAt: {
    type: Date,
    required: true
  },

  repeat: {
    type: String,
    enum: ['none', 'daily', 'weekly', 'monthly'],
    default: 'none'
  },

  isActive: {
    type: Boolean,
    default: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

const ReminderModel = mongoose.models.Reminder || mongoose.model<Reminder>('Reminder', reminderSchema);
export default ReminderModel;
