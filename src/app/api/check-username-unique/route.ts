import UserModel from "@/models/User.model";
import { ApiResponce } from "../../../../types/ApiResponce";
import { dbConnect } from "@/lib/dbConnect";
import { usernameValidation } from "@/schemas/signUpValidation";
import * as z from 'zod'


const usernameValidationSchema = z.object({
    username: usernameValidation
})


export async function GET(request: Request) {

    await dbConnect()

    try {
        //get the entire url
        const { searchParams } = new URL(request.url)
        //get only username from entire url
        const queryParam = {
            username: searchParams.get('username')
        }

        //zod validation
        const result = usernameValidationSchema.safeParse(queryParam)

        if (!result.success) {
            const usernameError = result.error.format().username?._errors || []
            //responce 
            return Response.json({
                success: false,
                message: `usernameError ${usernameError}`
            }, { status: 401 })
        }

        const { username } = result.data

        const existingUser = await UserModel.findOne({ username })

        if (existingUser) {
            return Response.json({
                success: false,
                message: "Username not available"
            }, { status: 401 })
        }

        return Response.json({
            success: true,
            message: "Username Available"
        }, { status: 200 })

    } catch (error) {
        console.log("catch uername-abailable.ts: Error checking username ")
        return Response.json({
            success: false,
            message: "Error checking username availability."
        }, { status: 500 })
    }
}