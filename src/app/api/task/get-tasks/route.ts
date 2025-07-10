import { dbConnect } from "@/lib/dbConnect";
import ProjectModel from "@/models/Project.model";
import TaskModel from "@/models/Task.model";
import { Task } from "@/models/Project.model";



export async function POST(req: Request) {

    const { projectId } = await req.json()

    await dbConnect()

    try {

        const project = await ProjectModel.findOne({_id: projectId});

        if (!project) {
            return Response.json({
                success: false,
                message: "Failed to find user project"
            }, { status: 400 })
        }


        const taskExists = project.tasks.map((taskEntry: Task) =>
            taskEntry.task.toString()
        );


        const tasks = await TaskModel.find({
            _id: { $in: taskExists }
        })


        if (!tasks) {
            return Response.json({
                success: false,
                message: "no tasks found",
                projects: []
            }, { status: 400 })
        }

        return Response.json({
            success: true,
            message: "Tasks found",
            tasks
        }, { status: 201 })

    } catch (error) {

        return Response.json({
            success: false,
            message: "Error Getting Projects of User"
        }, { status: 500 })

    }

}