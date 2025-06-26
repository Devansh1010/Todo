import { dbConnect } from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
import { USER_ROLES } from "@/models/UserRole";
import WorkspaceModel from "@/models/Workspace.model";

export async function POST(request: Request) {


    await dbConnect();

    try {
        const {
            name,
            description,
            createdBy,
            members,
            deletedTasks,
            settings,
            invitedUsernames,
        } = await request.json();

        console.log(request.json())
        if (!name || !createdBy) {
            return Response.json(
                {
                    success: false,
                    message: "Name and createdBy are required.",
                },
                { status: 400 }
            );
        }

        const invitedUsersDocs = await UserModel.find({
            username: { $in: invitedUsernames }
        });

        const invitedUser = invitedUsersDocs.map((user: any) => ({
            userId: user._id,
            role: "member", 
        }));

        const workspace = await WorkspaceModel.create({
            name,
            description,
            createdBy,
            members,
            deletedTasks,
            settings,
            invitedUser
        });


        if (!workspace) {
            return Response.json(
                {
                    success: false,
                    message: "Workspace not created.",
                },
                { status: 500 }
            );
        }



        return Response.json(
            {
                success: true,
                message: "Workspace created successfully.",
                workspace,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Catch: Error occurred while creating workspace", error);

        return Response.json(
            {
                success: false,
                message: "Internal server error",
            },
            { status: 500 }
        );
    }
}
