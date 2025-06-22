import UserModel from "@/models/User.model";
import { ApiResponce } from "../../../../types/ApiResponce";
import { dbConnect } from "@/lib/dbConnect";
import { usernameValidation } from "@/schemas/signUpValidation";
import * as z from 'zod'


const usernameValidationSchema = z.object({
    username: usernameValidation
})


export async function GET(request: Request): Promise<ApiResponce> {

    await dbConnect()
    console.log("Reached to the route of username-available")

    try {
        //get the entire url
        const { searchParams } = new URL(request.url)
        //get only username from entire url
        const queryParam = {
            username: searchParams.get('username')
        }

        //zod validation
        const result = usernameValidationSchema.safeParse(queryParam)

        console.log("zod validatoin result: ", result)

        if (!result.success) {
            const uernameErrors = result.error.format().username?._errors || []

            //responce 
            return {
                success: false,
                message: "Invalid query params"
            }
        }

        const { username } = result.data

        const existingUser = await UserModel.findOne({ username })

        if (existingUser) {
            return {
                success: false,
                message: "Username not available"
            }
        }

        return {
            success: true,
            message: "Username available"
        }

    } catch (error) {
        console.log("catch uername-abailable.ts: Error checking username ")
        return {
                success: false,
                message: "Username not available"
            }
    }
}