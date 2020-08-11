import * as actionTypes  from './actionTypes';
import { userService } from '../services';
import { history } from '../helpers';
import {toastr} from 'react-redux-toastr'

export const userActions = {
    login,
    logout,
    getAllUsers,
    getByEmail
};

function login(email, password) {
    return dispatch => {
		dispatch(request({ email }));
		userService.login(email, password)
			.then(
			    user => {
			    	  let name = user && `${ user.fullName.replace(/ /g,"_")}`
			    	  toastr.success('Success',"Successfully logged in")
			        dispatch(success(user));
			        
			        history.push(`/${name}`);
			    },
			    error => {
			    		toastr.error('Error',error.error_message || "Email and password not valid")
			        dispatch(failure(error.toString()));
			    }
			);
    };

    function request() { return { type: actionTypes.LOGIN_REQUEST } }
    function success(user) { return { type: actionTypes.LOGIN_SUCCESS, payload: {user} } }
    function failure(error) { return { type: actionTypes.LOGIN_FAILED } }
}

function logout() {
    userService.logout();
    toastr.success('Success',"Successfully logged out")
    history.push('/login')
    return { type: actionTypes.LOGOUT };
}

function getAllUsers(user_q) {
    return dispatch => {
			dispatch(request());
			userService.getAll(user_q)
				.then(
				    users => {
				        dispatch(success(users));
				    },
				    error => {
				    		toastr.error('Error',error)			       
				    }
				);
    };

    function request() { return { type: actionTypes.GET_REQUEST_SUCCESS } }
    function success(users) { return { type: actionTypes.GET_ALL_USERS, payload: {users} } }
}

function getByEmail(email) {
    return dispatch => {
			dispatch(request());
			userService.getByEmail(email)
				.then(
				    users => {
				        dispatch(success(users));
				    },
				    error => {
				    		toastr.error('Error',error)			       
				    }
				);
    };

    function request() { return { type: actionTypes.GET_REQUEST_SUCCESS } }
    function success(users) { return { type: actionTypes.GET_USER, payload: {users} } }
}