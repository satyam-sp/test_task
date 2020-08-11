import * as actionTypes from '../actions/actionTypes'

const initialState = {
  loading: false,
  posts: []
}

const posts = (state=initialState,action) => {
  switch(action.type){
  	case actionTypes.GET_REQUEST_SUCCESS:
  	  return {...state, loading: true,  loggingIn: true}
    case actionTypes.GET_ALL_POSTS:
      return {...state, loading: false, loggingIn: true, posts: action.payload.posts.data}
    default: 
      return {...state, loading: false} 
  }  
}

export default posts

