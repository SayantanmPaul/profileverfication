// validate username
import {  toast } from "react-hot-toast";


export async function usernameVaildate(values){
    const errors=usernameVerify({},values);

    return errors;
}

export async function passwordValidate(values){
    const errors=passwordVerify({},values);

    return errors;
}

{/* username validation */}

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


{/* password validation */}

function passwordVerify(errors={}, values){
    const specialch=/[~!@#$%^&*()-_+={}[\]|\\:;"'<>,.?/]/;
    if(!values.password){
        errors.password='password rquired!';
    }else if(values.password.includes(" ")){
        errors.password="can't use empty spaces";
    }else if(values.password.length<8){
        errors.password="password must be more than 8 charaters long";
    }else if(!specialch.test(values.password)){
        errors.password="password must includes special characters"
    }
    return errors;
}

