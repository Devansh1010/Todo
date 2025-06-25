import { Team } from "@/models/Team.model";
import { Workspace } from "@/models/Workspace.model";

export interface ApiResponce {
  success: boolean;
  message?: string;
  workspaces?: [Workspace];
  teams?: [Team]
}
