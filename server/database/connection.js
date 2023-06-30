import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

async function connect(){
    const mongodb=await MongoMemoryServer.create();
    const getURI=mongodb.getUri(); //retrive mogodb connection from memeory server

    mongoose.set('strictQuery', true) //handle undefined query
    const db=await mongoose.connect(getURI);
    console.log("database is connected ");
    return db;
}

export default connect;