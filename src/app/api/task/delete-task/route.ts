import { requireAuth } from "@/lib/authRequire";
import { dbConnect } from "@/lib/dbConnect";
import ProjectModel from "@/models/Project.model";
import TaskModel from "@/models/Task.model";
import UserModel from "@/models/User.model";

export async function POST(req: Request) {

    try {
        const user = await requireAuth();
        const userId = user.id;

        const { taskId } = await req.json()

        await dbConnect()

        const founduser = await UserModel.findOne({ _id: userId });

        if (!founduser) {
            return Response.json({
                success: false,
                message: "Failed to find user tasks"
            }, { status: 401 })
        }


        const taskExist = founduser.tasks?.some(
            (task) => task.toString() === taskId
        );


        if (!taskExist) {
            return Response.json({
                success: false,
                message: "No task found in your tasks",
            }, { status: 403 })
        }

        const task = await TaskModel.findOneAndDelete({ _id: taskId })

        if (!task) {
            return Response.json({
                success: false,
                message: "No task found",
            }, { status: 400 })
        }

        await UserModel.findByIdAndUpdate(userId, {
            $pull: { tasks: taskId }
        });

        await ProjectModel.findByIdAndUpdate(task.project, {
            $pull: { tasks: taskId }
        });

        return Response.json({
            success: true,
            message: "Task Deleted Successfully",
        }, { status: 201 })

    } catch (error) {

        return Response.json({
            success: false,
            message: "Error deleting task"
        }, { status: 500 })

    }

}