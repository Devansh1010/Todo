import { Team } from "@/models/Team.model";
import { Workspace } from "@/models/Project.model";

export interface ApiResponce {
  success: boolean;
  message: string;
  workspaces?: [Workspace];
  teams?: [Team]
}
