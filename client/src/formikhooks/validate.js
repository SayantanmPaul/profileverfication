// validate username
import {  toast } from "react-hot-toast";


export async function usernameVaildate(values){
    const errors=usernameVerify({},values);

    return errors;
}


function usernameVerify(error={}, values){
    if(!values.username){
        error.username= toast.error('username requireed');
        error.username='username required';
    }else if(values.username.includes(" ")){
        error.username=toast.error('invalid username!')
        error.username='no blank spaces';
    }
    return error;
}