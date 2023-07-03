import * as mongoose from 'mongoose'

export const UserSchema= new mongoose.Schema({
    // defineing the user schema
    username:{
        type: String,
        required: [true, "please provide unique username"],
        unique: [true, 'username exists!']
    },
    password:{
        type: String,
        required: [true, 'please provide a password'],
        unique: false
    },
    email:{
        type: String,
        required: [true, 'please provide a email address'],
        unique: true
    },
    
    firstname: { type: String},
    lastname: { type: String},
    githubid: { type: String},
    profile: { type: String}

});

export default mongoose.model('User', UserSchema);