import mongoose from "mongoose";
import dotenv from 'dotenv';    
import { MongoMemoryServer } from "mongodb-memory-server";

dotenv.config({path: './config.env'})

async function connect(){

    const mongod = await MongoMemoryServer.create();
    const getUri = mongod.getUri();

    mongoose.set('strictQuery', true)
    // const db = await mongoose.connect(getUri);
    const db = await mongoose.connect(process.env.ATLAS_URI,{
        
    useNewUrlParser: true,
    useUnifiedTopology: true,
    }).then(()=>{
        console.log("success");
    });
}

export default connect;