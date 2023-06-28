import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

async function connect(){
    const mongodb=await MongoMemoryServer.create();
    const getURI=mongodb.getUri();

    mongoose.set('strictQuery', true)
    const db=await mongoose.connect(getURI);
    console.log("database is connected ");
    return db;
}

export default connect;