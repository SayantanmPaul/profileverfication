import userModel from "../model/user.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ENV from '../config.js';

// middleware for veryfy user
export async function verifyUser(req,res, next){
    try{
        const {username}= req.method== 'GET'? req.query: req.body;

        // check user existance
        const exist= await userModel.findOne({username});
        if(!exist) return res.status(404).send({error: "can't find user"})
        next();

    }catch(error){
        return res.status(404).send({error: "authentication error"});
    }
}   


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
export async function login(req, res) {
  const { username, password } = req.body;

  try {
    userModel.findOne({ username })
      .then(user => {
        if (!user) {
          return res.status(404).send({ error: "Username not found" });
        }
        bcrypt.compare(password, user.password)
          .then(passwordCheck => {
            if (!passwordCheck) {
              return res.status(400).send({ error: "doesn't have the password" });
            }
            // JWT token
            const token = jwt.sign(
              {
                userID: user._id,
                username: user.username,
              },

            //   token from config.js
              ENV.JWT_SECRET,
              { expiresIn: '24h' }
            );

            return res.status(200).send({
              msg: "Login successful",
              username: user.username,
              token
            });
          })
          .catch(error => {
            return res.status(401).send({ error: "password didn't matched", details: error.message });
          });
      })
      .catch(error => {
        return res.status(404).send({ error: "Username not found" });
      });

  } catch (err) {
    return res.status(500).send({ error: "an error occurred" });
  }
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