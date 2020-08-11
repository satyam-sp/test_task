import axios from 'axios';
import CryptoJS from "crypto-js";
require('dotenv').config()
export const userService = {
    login,
    logout,
    getAll,
    getByEmail
};

function login(email, password) {
    const headers = {
        headers: { 'Content-Type': 'application/json' }
    };
    return axios.get(`${process.env.REACT_APP_API_URL}/users?email=${email}`, headers)
        .then(user => {
        	let currentUser = user.data && user.data[0] || {}
        	var bytes  = CryptoJS.AES.decrypt(currentUser.password.toString(), process.env.REACT_APP_SECRET_KEY);
			var plaintext = bytes.toString(CryptoJS.enc.Utf8);
			if(plaintext === password){
				// store user details session storage to keep user logged in between page refreshes
            	sessionStorage.setItem('user', JSON.stringify(currentUser));
            	return currentUser;
			}else{
			   throw {error_message: "Invalid password"}
			}
			

        });
}

function logout() {
    // remove user from session storage to log user out
    sessionStorage.removeItem('user');
}

function getAll(user_q) {
	let pUrl = user_q ? `users?q=${user_q}` : 'users'
    return axios.get(`${process.env.REACT_APP_API_URL}/${pUrl}`)
        .then(users => {return users})
}

function getByEmail(email){
    return axios.get(`${process.env.REACT_APP_API_URL}/users?q=${email}`)
        .then(users => {return users})
}