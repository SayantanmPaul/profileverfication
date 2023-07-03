import axios from 'axios';


// eslint-disable-next-line no-undef
axios.defaults.baseURL= 'http://localhost:8080/'

// make API request from backend

// authenticate function

export async function authenticate(username){
    try {
        return await axios.post('/api/auth', {username})
    } catch (error) {
        return  { error: "username doesn't exists"}
    }
}


// get user details

export async function getUser({username}){
    try {
        return await axios.get(`/api/user/${username}`)
    } catch (error) {
        return {error: "password doesn't matched"}
    }
}


// register user function

export async function registerUser(credentials){
    try {
        const {data: {msg}, status}= await axios.post(`/api/register`, credentials);
        const {username, email}= credentials;

        // send email when successful registration
        if(status===201){
            axios.post('/api/registerMail', { username, userEmail: email, text: msg})
        }
        return Promise.resolve(msg);

    } catch (error) {
        return Promise.reject({error})
    }
}

// user login function
export async function verifyPassword({username, password}){
    try {
        if(username){
            const response= await axios.post('/api/login',{username, password})
            const {data}=response;
            return Promise.resolve({data});
        }        
    } catch (error) {
        return Promise.reject({error: "password doesn't matched"})
    }
}


// update user function

export async function updateUser(response){
    try {
        const token= localStorage.getItem('token');
        const data= await axios.put('/api/updateUser', response, {headers: {"Authorization": `Bearer ${token}`}})
        return Promise.resolve({data})

    } catch (error) {
        return Promise.reject({error: "couldn't update profile "})
    }

}

// generate OTP function
export async function generateOTP(username){
    try {
        const {data: code, status}= await axios.get('/api/generateOTP',{ params: {username}})

        // send mail with the otp
        if(status=== 201){
            const {data: {email}}= await getUser({username})
            const text= `the recovery password otp is ${code}, verify and recover your password.`;
            await axios.post('/api/registerMail', {username, userEmail: email, text, subject: "password recovery"})
        }
        return Promise.resolve(code);
    } catch (error) {
        return Promise.reject({error})
    }
}


// verify OTP function
export async function verifyOTP({ username, code}){
    try {
        const { data, status}= await axios.get('/api/verifyOTP', {params: { username, code}})
        return{ data, status};
    } catch (error) {
        return Promise.reject({error})
    }
}

// reset password function

export async function resetPassword({ username, password}){
    try {
        const {data,status}= await axios.put('/api/resetPassword', {username, password})
        return Promise.resolve({data, status})
    } catch (error) {
        return Promise.reject({error})
    }
}