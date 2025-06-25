
import { dbConnect } from "@/lib/dbConnect";
import { usernameValidation } from "@/schemas/signUpValidation";
import * as z from 'zod'
import WorkspaceModel from "@/models/Workspace.model";
import { $brand } from "zod/v4";


const workspaceNameValidationSchema = z.object({
    workspaceName: z.string().min(2, "Minimum 2 characters required"),
    userId: z.string().min(1, "User ID is required")
});


export async function GET(request: Request) {

    await dbConnect()

    try {

        const { searchParams } = new URL(request.url)
        const queryData = {
            workspaceName: searchParams.get('workspaceName') || '',
            userId: searchParams.get('userId') || ''
        };


        //zod validation
        const result = workspaceNameValidationSchema.safeParse(queryData);

        if (!result.success) {
            const workspaceNameError = result.error.format().workspaceName?._errors || []
            //responce 
            return Response.json({
                success: false,
                message: `usernameError ${workspaceNameError}`
            }, { status: 401 })
        }

        const { workspaceName, userId } = result.data;

        const existingWorkspace = await WorkspaceModel.find(
            {
                $and: [
                    { name: workspaceName },
                    { createdBy: userId }
                ]
            }
        )

        if (existingWorkspace) {
            return Response.json({
                success: false,
                message: "Workspace already exist please choose different name"
            }, { status: 401 })
        }

        return Response.json({
            success: true,
            message: "Workspace name unique"
        }, { status: 200 })

    } catch (error) {
        console.log("catch workspace-name-unique.ts: Error checking username ")
        return Response.json({
            success: false,
            message: "Error checking username availability."
        }, { status: 500 })
    }
}