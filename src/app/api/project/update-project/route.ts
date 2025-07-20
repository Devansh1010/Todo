import { auth } from "@/auth";
import { requireAuth } from "@/lib/authRequire";
import { dbConnect } from "@/lib/dbConnect";
import ProjectModel from "@/models/Project.model";
import UserModel from "@/models/User.model";
import { User } from "@/models/User.model";

// TODO: Templets section is pending

export async function PATCH(req: Request) {

    try {
        const user = await requireAuth();
        const userId = user._id;

        const { projectId, name, description, members, invitedUser } = await req.json();

        if (!userId) {
            return Response.json({
                success: false,
                message: "Not authorized"
            }, { status: 400 })
        }

        await dbConnect()

        const project = await ProjectModel.findOneAndUpdate({ _id: projectId },
            {
                name,
                description,
                $addToSet: {
                    members: { $each: members },
                    invitedUser: { $each: invitedUser },
                },
            })

        if (!project) {
            return Response.json({
                success: false,
                message: "Failed to update Project"
            }, { status: 400 })
        }


        await UserModel.findOneAndUpdate(
            { _id: userId },
            {
                $addToSet: {
                    projects: project._id,
                },
            },
        );


        return Response.json({
            success: true,
            message: "Project updated Successfully"
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
            message: `Error Updating Project: ${errorMessage}`
        }, { status: 500 });
    }
}