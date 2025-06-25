import { dbConnect } from "@/lib/dbConnect";
import Workspace from "@/models/Workspace.model";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const workspaceId = searchParams.get("workspaceId");
    console.log(workspaceId)

    await dbConnect()

    try {
        const workspace = await Workspace.findById( workspaceId );
        console.log("workspace:",workspace)

        if (!workspace) {
            return Response.json({
                success: true,
                workspace: {}
            });
        }

        return Response.json({
            success: true,
            workspace
        });

    } catch (error) {
        console.log("workspace-by-id catch:", error);
        return Response.json({
            success: false,
            message: "Internal server error"
        }, { status: 500 });
    }
}