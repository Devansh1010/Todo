import { auth } from "@/auth";
import { requireAuth } from "@/lib/authRequire";
import { dbConnect } from "@/lib/dbConnect";
import ProjectModel from "@/models/Project.model";
import UserModel from "@/models/User.model";
import { User } from "@/models/User.model";

// TODO: Templets section is pending

export async function POST(req: Request) {

    try {

        const user = await requireAuth();
        const userId = user._id;


        const { name, description, members, invitedUser } = await req.json()

        if (!name || !userId) {
            return Response.json({
                success: false,
                message: "Title is required"
            }, { status: 400 })
        }

        await dbConnect()

        const project = await ProjectModel.create({
            name,
            description,
            createdBy: userId,
            members,
            invitedUser
        })

        if (!project) {
            return Response.json({
                success: false,
                message: "Failed to Create Project"
            }, { status: 400 })
        }


        const foundUser = await UserModel.findOneAndUpdate(
            { _id: userId },
            {
                $addToSet: {
                    projects: project._id,  // ✅ directly use ObjectId
                },
            },
            { new: true }
        );


        return Response.json({
            success: true,
            message: "Project Created Successfully"
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
            message: `Error Creating Project: ${errorMessage}`
        }, { status: 500 });
    }
}