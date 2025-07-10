import { dbConnect } from "@/lib/dbConnect";
import ProjectModel from "@/models/Project.model";
import UserModel from "@/models/User.model";


export async function POST(req: Request) {

    const { userId } = await req.json()

    await dbConnect()

    try {
        
        const user = await UserModel.findOne({_id: userId});

        console.log("User: ", user)

        if (!user) {
            return Response.json({
                success: false,
                message: "Failed to find user projects"
            }, { status: 400 })
        }

        console.log(user)
        const projectExists = user.projects.map(proj =>
            proj.project.toString()
        );


        console.log("Project Id: ", projectExists);

        const projects = await ProjectModel.find({
            _id: { $in: projectExists }
        })

        console.log("Project Details: ", projects)

        if (!projects) {
            return Response.json({
                success: false,
                message: "no project found",
                projects: []
            }, { status: 400 })
        }

        return Response.json({
            success: true,
            message: "Project found",
            projects
        }, { status: 201 })

    } catch (error) {

        return Response.json({
            success: false,
            message: "Error Getting Projects of User"
        }, { status: 500 })

    }

}