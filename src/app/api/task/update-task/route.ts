
import { requireAuth } from "@/lib/authRequire";
import { dbConnect } from "@/lib/dbConnect";
import ProjectModel from "@/models/Project.model";
import TaskModel from "@/models/Task.model";
import UserModel from "@/models/User.model";

export async function PATCH(req: Request) {

    try {

        const user = await requireAuth();
        const userId = user._id;

        const { 
            taskId, 
            title,
            description,
            assignedTo,
            dueDate,
            status,
            priority,
            subTasks 
        } = await req.json();

        if (!userId) {
            return Response.json({
                success: false,
                message: "Not authorized"
            }, { status: 400 })
        }

        await dbConnect()

        const task = await TaskModel.findOneAndUpdate({ _id: taskId },
            {
                title,
                description,
                assignedTo:{ $addToSet: { $each: assignedTo },},
                dueDate,
                status,
                priority,
                subTasks: { $addToSet: { $each: subTasks },},
            }, { new: true });

        if (!task) {
            return Response.json({
                success: false,
                message: "Failed to update Task"
            }, { status: 400 })
        }


        await UserModel.findOneAndUpdate(
            { _id: userId },
            {
                $addToSet: {
                    tasks: task._id,
                },
            },
        );


        return Response.json({
            success: true,
            message: "Task updated Successfully"
        }, { status: 201 })

    } catch (error: any) {
        const errorMessage = typeof error === "string" ? error : error.message;

        if (errorMessage === "Unauthorized") {
            return Response.json({
                success: false,
                message: "Unauthorized access"
            }, { status: 401 });
        }

        return Response.json({
            success: false,
            message: `Error Updating Task: ${errorMessage}`
        }, { status: 500 });
    }
}