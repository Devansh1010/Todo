import { requireAuth } from "@/lib/authRequire";
import { dbConnect } from "@/lib/dbConnect";
import ProjectModel, { Project } from "@/models/Project.model";
import UserModel from "@/models/User.model";

export async function POST(req: Request) {



    try {

        const user = await requireAuth();
        const userId = user.id;


        // TODO: Add authentication with role
        await dbConnect()

        const founduser = await UserModel.findOne({ _id: userId });

        if (!founduser) {
            return Response.json({
                success: false,
                message: "Failed to find user projects"
            }, { status: 401 })
        }


        const projectExists = founduser.projects.map((proj) =>
            proj.project.toString()
        );


        const projects = await ProjectModel.find({
            _id: { $in: projectExists }
        })


        if (!projects) {
            return Response.json({
                success: false,
                message: "no project found",
                projects: []
            }, { status: 404 })
        }

        return Response.json({
            success: true,
            message: "Project found",
            projects
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