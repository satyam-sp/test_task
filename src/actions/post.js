import * as actionTypes  from './actionTypes';
import { postService } from '../services';
import { history } from '../helpers';
import {toastr} from 'react-redux-toastr'

export const postActions = {
    getAllPosts,
    getMyPosts
};

function getAllPosts(post_q) {
    return dispatch => {
		dispatch(request());
		postService.getAll(post_q)
			.then(
			    posts => {
			        dispatch(success(posts));
			    },
			    error => {
			        toastr.error('Error',error)
			        
			        //dispatch(alertActions.error(error.toString()));
			    }
			);
    };

    function request() { return { type: actionTypes.GET_REQUEST_SUCCESS } }
    function success(posts) { return { type: actionTypes.GET_ALL_POSTS, payload: {posts} } }
}

function getMyPosts(userId) {
    return dispatch => {
		dispatch(request());
		postService.getMyPosts(userId)
			.then(
			    posts => {
			        dispatch(success(posts));
			    },
			    error => {
			        toastr.error('Error',error)
			        
			        //dispatch(alertActions.error(error.toString()));
			    }
			);
    };

    function request() { return { type: actionTypes.GET_REQUEST_SUCCESS } }
    function success(posts) { return { type: actionTypes.GET_ALL_POSTS, payload: {posts} } }
}