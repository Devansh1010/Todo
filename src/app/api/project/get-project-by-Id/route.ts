import { dbConnect } from "@/lib/dbConnect";
import ProjectModel from "@/models/Project.model";

export async function POST(req: Request) {

    const { projectId } = await req.json()

    await dbConnect()

    try {
        
        const project = await ProjectModel.find({ _id: projectId })

        console.log("Project Details: ", project)

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