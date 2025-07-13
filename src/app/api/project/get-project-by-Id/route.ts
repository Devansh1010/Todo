import { requireAuth } from "@/lib/authRequire";
import { dbConnect } from "@/lib/dbConnect";
import ProjectModel from "@/models/Project.model";
import UserModel from "@/models/User.model";

export async function POST(req: Request) {

    try {
        const user = await requireAuth();
        const userId = user.id;

        const { projectId } = await req.json()

        console.log("ProjectId:",projectId)

        await dbConnect()

        console.log("Request came")

        const founduser = await UserModel.findOne({ _id: userId });

        if (!founduser) {
            return Response.json({
                success: false,
                message: "Failed to find user projects"
            }, { status: 401 })
        }


        const projectExists = founduser.projects
            .map((proj) => proj.project.toString())
            .includes(projectId);

        if (!projectExists) {
            return Response.json({
                success: false,
                message: "not authorized to project",
                project: {}
            }, { status: 403 })
        }
        const project = await ProjectModel.find({ _id: projectId })

        console.log(project)
        if (!project) {
            return Response.json({
                success: false,
                message: "no project found",
                project: {}
            }, { status: 400 })
        }

        return Response.json({
            success: true,
            message: "Project found",
            project
        }, { status: 201 })

    } catch (error) {

        return Response.json({
            success: false,
            message: "Error Getting Projects of User"
        }, { status: 500 })

    }

}