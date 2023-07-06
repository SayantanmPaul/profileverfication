import mongoose from "mongoose";
import dotenv from 'dotenv';    

dotenv.config({path: './config.env'})

async function connect(){

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