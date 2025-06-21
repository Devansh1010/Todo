import User from "@/models/User.model";
import { ApiResponce } from "../../../types/ApiResponce";


export async function GET(request: Request): Promise<ApiResponce> {
    try {
        const { username } = await request.json()

        const user = await User.findOne({ username })

        if (user) {
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

        return {
            success: false,
            message: "Error while checking username avalilability."
        }
    }
}