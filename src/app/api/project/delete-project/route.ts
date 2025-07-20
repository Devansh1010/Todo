import { requireAuth } from "@/lib/authRequire";
import { dbConnect } from "@/lib/dbConnect";
import ProjectModel from "@/models/Project.model";
import UserModel from "@/models/User.model";

export async function POST(req: Request) {

    try {
        
        const user = await requireAuth();
        const userId = user.id;

        const { projectId } = await req.json()

        await dbConnect()

        const founduser = await UserModel.findOne({ _id: userId });

        if (!founduser) {
            return Response.json({
                success: false,
                message: "Failed to find user projects"
            }, { status: 401 })
        }


        const projectExists = founduser.projects?.some(
            (proj) => proj.toString() === projectId
        );


        if (!projectExists) {
            return Response.json({
                success: false,
                message: "No project found in your projects",

            }, { status: 403 })
        }

        await UserModel.findByIdAndUpdate(userId, {
            $pull: { projects: projectId }
        });


        const project = await ProjectModel.findOneAndDelete({ _id: projectId })

        if (!project) {
            return Response.json({
                success: false,
                message: "No project found",
            }, { status: 400 })
        }

        return Response.json({
            success: true,
            message: "Project Deleted Successfully",
        }, { status: 201 })

    } catch (error) {

        return Response.json({
            success: false,
            message: "Error deleting Project"
        }, { status: 500 })

    }

}