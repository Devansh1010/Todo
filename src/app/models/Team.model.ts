import mongoose, { Schema, Document } from 'mongoose';

export interface Team extends Document {
  name: string;
  workspaceId: mongoose.Types.ObjectId;
  createdBy: mongoose.Types.ObjectId;
  members: mongoose.Types.ObjectId[]; // optional
}

const teamSchema = new Schema<Team>({
  name: {
    type: String,
    required: [true, 'Team name is required'],
  },

  workspaceId: {
    type: Schema.Types.ObjectId,
    ref: 'Workspace',
    required: true,
  },

  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  members: [{  // optional
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],

}, { timestamps: true });

const TeamModel = mongoose.models.Team || mongoose.model<Team>('Team', teamSchema);
export default TeamModel;
