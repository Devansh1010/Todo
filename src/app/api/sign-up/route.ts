import User from "@/models/User.model";
import bcrypt from "bcryptjs";
import { ApiResponce } from "../../../../types/ApiResponce";

export async function POST(request: Request): Promise<ApiResponce> {
    try {
        const { username, email, password } = await request.json();

        // find user
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return {
                success: false,
                message: "User already exists",
            };
        }

        // hashPassword
        const pwHash = await bcrypt.hash(password, 10)

        //create User
        const user = await User.create({
            username,
            email,
            password
        })


        return {
            success: true,
            message: "User Registerd Successfully",
        };



    } catch (error) {
        console.log("Error registering user", error)
        return {
            success: false,
            message: "Error generated while registering user",  
        };
    }
}