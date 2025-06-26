
import { dbConnect } from "@/lib/dbConnect";
import User from "@/models/User.model";
import Workspace from "@/models/Workspace.model";


export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return Response.json({ success: false, message: "Missing userId" }, { status: 400 });
  }

  await dbConnect();

  try {
    const user = await User.findById(userId);

    if (!user || !user.workspaceIds || user.workspaceIds.length === 0) {
      return Response.json({
        success: true,
        workspaces: []
      });
    }

   const workspaceIds = user.workspaceIds.map((w)=> w.workspaces)

    const workspaces = await Workspace.find({
      _id: { $in: workspaceIds }
    });

    return Response.json({
      success: true,
      workspaces
    });

  } catch (error) {
    console.log("workspaces catch:", error);
    return Response.json({
      success: false,
      message: "Internal server error"
    }, { status: 500 });
  }
}
