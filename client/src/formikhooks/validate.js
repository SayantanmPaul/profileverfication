// validate username
import {  toast } from "react-hot-toast";


export async function usernameVaildate(values){
    const errors=usernameVerify({},values);

    return errors;
}
// password validation

export async function passwordValidate(values){
    const errors=passwordVerify({},values);

    return errors;
}

{/* reset password validation */}

export async function resetpsdValidation(values) {
    const errors = passwordVerify({}, values);
    if (values.password !== values.repeat_pwd) {
      errors.match = "Passwords don't match";
    }
    return errors;
}

// registration page validation
export async function registerValidate(values){
    const errors=usernameVerify({}, values);
    passwordVerify(errors, values);
    emailVerify(errors, values);

    return errors;
}   

{/* username validation */}

function usernameVerify(error={}, values){
    if(!values.username){
        error.username='username required';
    }else if(values.username.includes(" ")){
        error.username='no blank spaces';
    }
    return error;
}

// email validationa

function emailVerify(error={}, values){
    if(!values.email){
        error.email= 'email required!';
    }else if(values.email.includes(" ")){
        error.email= 'email can&apos;t be empty!';
    } else if(/[~!@#$%^&*()-_+={}[\]|\\:;"'<>,.?/]/.test(values.email)){
        error.email='invalid email address!'
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


