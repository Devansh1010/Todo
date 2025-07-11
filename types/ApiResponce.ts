import { Project } from "@/models/Project.model";
import { Task } from "@/models/Task.model";


export  interface ApiResponce {
  success: boolean;
  message: string;
  projects?: Array<Project>
  tasks? : Array<Task>
}
