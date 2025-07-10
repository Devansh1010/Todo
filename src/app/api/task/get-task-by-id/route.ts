import { dbConnect } from "@/lib/dbConnect";
import TaskModel from "@/models/Task.model";

export async function POST(req: Request) {

    const { taskId } = await req.json()

    await dbConnect()

    try {
        
        const task = await TaskModel.find({ _id: taskId })

        if (!task) {
            return Response.json({
                success: false,
                message: "no project found",
                task: {}
            }, { status: 400 })
        }

        return Response.json({
            success: true,
            message: "Project found",
            task
        }, { status: 201 })

    } catch (error) {

        return Response.json({
            success: false,
            message: "Error Getting Projects of User"
        }, { status: 500 })

    }

}