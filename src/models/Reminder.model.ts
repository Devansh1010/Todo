import mongoose, { Schema, Document } from 'mongoose';

export type AlertType =
  | 'reminder'
  | 'mention'
  | 'assignment'
  | 'comment'
  | 'role-update'
  | 'invite'
  | 'general';

export type AlertTrigger =
  | 'task'
  | 'team'
  | 'comment'
  | 'workspace'
  | 'system';

export type RepeatType = 'none' | 'daily' | 'weekly' | 'monthly';

export interface Alert extends Document {
  userId: mongoose.Types.ObjectId;
  workspaceId: mongoose.Types.ObjectId;
  title: string;
  message?: string;
  type: AlertType;
  triggerFor: AlertTrigger;
  referenceId?: mongoose.Types.ObjectId;

  remindAt?: Date;
  repeat?: RepeatType;

  isReminder: boolean;

  read: boolean;
  toastShown: boolean;
  delivered: boolean;

  createdAt: Date;
}

const alertSchema = new Schema<Alert>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User', required: true
  },
  workspaceId: {
    type: Schema.Types.ObjectId,
    ref: 'Workspace', required: true
  },

  title: {
    type: String,
    required: true
  },

  message: { type: String },

  type: {
    type: String,
    enum: ['reminder', 'mention', 'assignment', 'comment', 'role-update', 'invite', 'general'],
    required: true
  },

  triggerFor: {
    type: String,
    enum: ['task', 'team', 'comment', 'workspace', 'system'],
    required: true
  },

  referenceId: {
    type: Schema.Types.ObjectId,
    required: false
  },

  remindAt: { type: Date },

  repeat: {
    type: String,
    enum: ['none', 'daily', 'weekly', 'monthly'],
    default: 'none'
  },

  isReminder: {
    type: Boolean,
    default: false
  },

  read: {
    type: Boolean,
    default: false
  },
  toastShown: {
    type: Boolean,
    default: false
  },
  delivered: {
    type: Boolean,
    default: false
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

const AlertModel = mongoose.models.Alert || mongoose.model<Alert>('Alert', alertSchema);
export default AlertModel;
