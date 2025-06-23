import User from "@/models/User.model";
import bcrypt from "bcryptjs";
import { ApiResponce } from "../../../../types/ApiResponce";

export async function POST(request: Request) {
    try {
        const { username, email, password } = await request.json();

        // find user
        const existingUser = await User.findOne({ email })
        
        if (existingUser) {
            return Response.json({
                success: false,
                message: "User Alrady Exist"
            }, { status: 400 });
        }

        // hashPassword
        const pwHash = await bcrypt.hash(password, 10)

        //create User
        const user = await User.create({
            username,
            email,
            password: pwHash
        })


       return Response.json({
            success: true,
            message: "User Registed Successfully"
        }, {status: 200})



    } catch (error) {
        console.log("Error registering user", error)
        return Response.json({
            success: false,
            message: "Error registuring User"
        }, {status: 500})
    }
}