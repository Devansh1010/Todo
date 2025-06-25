import { dbConnect } from "@/lib/dbConnect";
import TaskModel from "@/models/Task.model";
import TeamModel from "@/models/Team.model";
import WorkspaceModel from "@/models/Workspace.model";

export async function DELETE(req: Request) {
    const { searchParams } = new URL(req.url);
    const workspaceId = searchParams.get("workspaceId");

    if (!workspaceId) {
        return Response.json({
            success: false,
            message: "No Id found"
        }, { status: 400 });
    }

    await dbConnect();

    try {


        const teams = await TeamModel.find({ workspaceId });

        const teamIds = teams.map(team => team._id);

        await TaskModel.deleteMany({ teamId: { $in: teamIds } });


        await TeamModel.deleteMany({ workspaceId });


        const res = await WorkspaceModel.deleteOne({ _id: workspaceId });

        if (res.deletedCount === 0) {
            return Response.json({
                success: false,
                message: "No workspace deleted"
            }, { status: 404 });
        }

        return Response.json({
            success: true,
            message: "Workspace deleted"
        });

    } catch (error) {
        console.error("Error deleting workspace:", error);
        return Response.json({
            success: false,
            message: "Internal server error"
        }, { status: 500 });
    }
}
