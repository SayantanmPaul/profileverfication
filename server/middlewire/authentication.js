
import JWT from 'jsonwebtoken';
import ENV from '../config.js';


export default async function Auth(req, res, next){
    try {
        // access for authorized user
        // get the login token
        const token =req.headers.authorization.split(" ")[1];

        // retrive the user details for the loggedin user
        const decodeToken= await JWT.verify(token, ENV.JWT_SECRET);
        
        req.user= decodeToken;

        // res.json(decodeToken);


        
        next();


    } catch (error) {
        res.status(401).json({error:"authentication failed! "})       
    }
}
