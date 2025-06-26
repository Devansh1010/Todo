import UserModel from "@/models/User.model";
import WorkspaceModel from "@/models/Workspace.model";
import { dbConnect } from "@/lib/dbConnect";
import { success } from "zod/v4";
import { tr } from "zod/v4/locales";

export async function UPDATE(req: Request) {

    const { searchParams } = new URL(req.url);
    const workspaceId = searchParams.get("workspaceId");

    await dbConnect()

    try {
        const {
            name,
            description,
            createdBy,
            members,
            deletedTasks,
            settings,
            invitedUsernames,
        } = await req.json();

        const updatedUser = await WorkspaceModel.findByIdAndUpdate(workspaceId, {

            $set: {
                ...(name && { name }),
                ...(description && { description }),
                ...(createdBy && { createdBy }),
                ...(settings && { settings }),
            },
            ...(Array.isArray(members) && members.length > 0
                ? { $push: { members: { $each: members } } }
                : {}),
            ...(Array.isArray(invitedUsernames) && invitedUsernames.length > 0
                ? { $push: { invitedUsernames: { $each: invitedUsernames } } }
                : {}),
            ...(Array.isArray(deletedTasks) && deletedTasks.length > 0
                ? { $push: { deletedTasks: { $each: deletedTasks } } }
                : {}),
        }, { new: true })

        if (!updatedUser) {
            console.log('❌ User not found or not updated');
            return Response.json({
                success: false,
                message: `Workspace not found or not updated`
            })
        }

        return Response.json({
            success: true,
            message: `Workspace updated Successfully`
        })


    } catch (error) {

        return Response.json({
            success: false,
            message: `Error updating workspace ${error}`
        })

    }
}