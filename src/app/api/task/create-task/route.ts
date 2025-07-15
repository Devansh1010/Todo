import { dbConnect } from "@/lib/dbConnect";
import ProjectModel from "@/models/Project.model";
import TaskModel from "@/models/Task.model";
import UserModel from "@/models/User.model";


export async function POST(req: Request) {

    const {
        title,
        description,
        createdBy,
        project,
        assignedTo,
        dueDate,
        status,
        priority,
        subTasks
    } = await req.json()

    if (!title || !createdBy || !project) {
        return Response.json({
            success: false,
            message: "Some fields are missing"
        }, { status: 400 })
    }

    await dbConnect()

    try {

        console.log()
        const task = await TaskModel.create({
            title,
            description,
            createdBy,
            project,
            assignedTo,
            dueDate,
            status,
            priority,
            subTasks
        })

        if (!task) {
            return Response.json({
                success: false,
                message: "Failed to Create Task"
            }, { status: 400 })
        }

        console.log("Task: ", task)
        const user = await UserModel.findOneAndUpdate(
            { _id: createdBy },
            {
                $addToSet: {
                    tasks: { task: task._id }
                }
            },
            { new: true }
        );
        
        const updatedProject = await ProjectModel.findOneAndUpdate(
            { _id: project },
            {
                $addToSet: {
                    tasks: task._id
                }
            },
            { new: true }
        );

        return Response.json({
            success: true,
            message: "Task Created Successfully"
        }, { status: 201 })

    } catch (error) {

        return Response.json({
            success: false,
            message: `Error Creating Task: ${error}`
        }, { status: 500 })
    }
}