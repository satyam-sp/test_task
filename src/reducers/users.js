import * as actionTypes from '../actions/actionTypes'

const initialState = {
  loading: false,
  users: [],
  user: {},
  initialValues: {}
}

const users = (state=initialState,action) => {

  switch(action.type){
  	case actionTypes.LOGIN_REQUEST:
  	   return {...state, loggingIn: true}
  	case actionTypes.LOGIN_FAILED:
  		return {...state, loggingIn: false}
  	case actionTypes.GET_REQUEST_SUCCESS:
  	  return {...state, loading: true,  loggingIn: true}
    case actionTypes.LOGIN_SUCCESS:
      return {...state, loading: false, loggingIn: true, currentUser: action.payload.user}
    case actionTypes.GET_USER:
    	return {...state, loading: false, user: action.payload.users.data[0], initialValues: action.payload.users.data[0]}
    case actionTypes.GET_ALL_USERS:
      return {...state, loading: false, loggingIn: true, users: action.payload.users.data}
    case actionTypes.LOGOUT:
      return {...state, loading: false, loggingIn: false}
    default: 
      return {...state, loading: false} 
  }  
}

export default users

