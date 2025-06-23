import mongoose from "mongoose";

//New Version:- 

 const MONGODB_URI ="mongodb+srv://devanshprajapati36:6VGjxjZS42QZck7o@todocluster.3qjrixi.mongodb.net/";

 if(!MONGODB_URI) {
    throw new Error("Please define mongodb uri on the env file.")
 }

 let cached = global.mongoose;

 if(!cached) {
    cached = global.mongoose = {
        conn: null,
        promise: null
    }
 }

 export async function dbConnect() {
    if(cached.conn){
        return cached.conn
    }

    if(!cached.promise){
        cached.promise = mongoose
        .connect(MONGODB_URI)
        .then(() => mongoose.connection)
    }

    try {
        cached.conn = await cached.promise
    } catch (error) {
        cached.promise = null
        throw error
    }

    return cached.conn
 }

 // Old version:- 

// type ConnectionObject = {
//     isConnected?: number
// }

// const connection: ConnectionObject = {}

// async function dbConnect(): Promise<void> {

//     //Checking is Database already connected?
//     if(connection.isConnected){
//         console.log("Already Connected");
//         return 
//     }

//     //if not
//     try {
//         const db = await mongoose.connect(process.env.MONGODB_URI || '')

//         //setting isConnected from db object.
//         connection.isConnected = db.connections[0].readyState

//         console.log("Database Connected successfully. ", "Check return object of db: ", db);
        
        
//     } catch (error) {
//         console.log("Database Connection Failed ", error);
        
//         process.exit(1)
//     }
    
// }