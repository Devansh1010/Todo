import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number
}

const connection: ConnectionObject = {}

async function dbConnect(): Promise<void> {

    //Checking is Database already connected?
    if(connection.isConnected){
        console.log("Already Connected");
        return 
    }

    //if not
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || '')

        //setting isConnected from db object.
        connection.isConnected = db.connections[0].readyState

        console.log("Database Connected successfully. ", "Check return object of db: ", db);
        
        
    } catch (error) {
        console.log("Database Connection Failed ", error);
        
        process.exit(1)
    }
    
}