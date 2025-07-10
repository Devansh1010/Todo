import { dbConnect } from "@/lib/dbConnect";
import ProjectModel from "@/models/Project.model";
import UserModel from "@/models/User.model";


// TODO: Templets section is pending

export async function POST(req: Request) {
    const { name, description, createdBy, members, invitedUser } = await req.json()

    if (!name || !createdBy) {
        return Response.json({
            success: false,
            message: "Some fields are missing"
        }, { status: 400 })
    }

    await dbConnect()

    try {
        const project = await ProjectModel.create({
            name,
            description,
            createdBy,
            members,
            invitedUser
        })

        if (!project) {
            return Response.json({
                success: false,
                message: "Failed to Create Project"
            }, { status: 400 })
        }


        const user = await UserModel.findOneAndUpdate(
            { _id: createdBy },
            {
                $addToSet: {
                    projects: { project: project._id }
                }
            },
            { new: true }
        );

        return Response.json({
            success: true,
            message: "Project Created Successfully"
        }, { status: 201 })
    } catch (error) {

        return Response.json({
            success: false,
            message: `Error Creating Project: ${error}`
        }, { status: 500 })
    }
}