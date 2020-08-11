import { combineReducers } from "redux"
import { routerReducer } from "react-router-redux"
import {reducer as toastrReducer} from 'react-redux-toastr'

import users from './users';
import posts from './posts';

export default combineReducers({
  users: users,
  posts: posts,
  toastr: toastrReducer,
  router: routerReducer
})

