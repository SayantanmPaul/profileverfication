import userModel from "../model/user.model.js";
import bcrypt from 'bcrypt';

// POST: http://localhost:8080/api/register
export async function register(req, res){
    try{
        const { email, username, profile, password }= req.body;

        // check the existing user
        const userExist=userModel.findOne({username}).exec();

        // check for existing email
        const emailExist= userModel.findOne({email}).exec();

        try{
            // uniqie user and email check
            await Promise.all([userExist, emailExist])
            if(password){
                const hashPassword= await bcrypt.hash(password, 10)
                const newUser= new userModel({
                    username,
                    password: hashPassword,
                    profile: profile || '',
                    email: email
                })
                const result=await newUser.save();
    
                return res.status(201).send({
                    message:' user registerd successfully!'
                })
            }
        }catch(error){
            return res.status(500).send({error: "having error"});
        }
        
    }catch(error){
        return res.status(500).send({error});
    }
}

// POST: http://localhost:8080/api/login
export async function login(req, res){
    res.json('login route');
}

// GET: http://localhost:8080/api/user/username
export async function getUser(req, res){
    res.json('getUser route');
}

// PUT: http://localhost:8080/api/updateuser
export async function updateUser(req, res){
    res.json('updateUser route');
}

// GET: http://localhost:8080/api/generateOTP
export async function generateOTP(req, res){
    res.json('generateOTP route');
}

// GET: http://localhost:8080/api/verifyOTP
export async function verifyOTP(req, res){
    res.json('verifyOTP route');
}

// redirect user when the otp is valid 
// GET: http://localhost:8080/api/resetSession
export async function resetSession(req, res){
    res.json('resetSession route');
}

//update password when a valid session
// PUT: http://localhost:8080/api/resetPassword
export async function resetPassword(req, res){
    res.json('resetPassword route');
}