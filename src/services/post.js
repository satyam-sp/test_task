import axios from 'axios';
require('dotenv').config()
export const postService = {
    getAll,
    getMyPosts
};

function getAll(post_q) {
    let pUrl = post_q ? `blogs?q=${post_q}` : 'blogs'
	return axios.get(`${process.env.REACT_APP_API_URL}/${pUrl}`)
	.then(posts => {
		return posts
	});
}

function getMyPosts(userId) {
	return axios.get(`${process.env.REACT_APP_API_URL}/blogs?userId=${userId}`)
	.then(posts => {
		return posts
	});
}
