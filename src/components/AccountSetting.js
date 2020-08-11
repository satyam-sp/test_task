import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../actions';
import { useForm } from "react-hook-form";
import { history } from '../helpers';



function AccountSetting(props) {
   
    const [status, setStatus] = useState(sessionStorage.user && JSON.parse(sessionStorage.user).status)
    const [currentUser, setUser] = useState(sessionStorage.user && JSON.parse(sessionStorage.user))
    const user = useSelector(state => state.users.user);
    const dispatch = useDispatch();
    useEffect(() => { 
       dispatch(userActions.getByEmail(currentUser.email)); 
    }, []);

    function submit(values){
       let user = sessionStorage.user && JSON.parse(sessionStorage.user)
       let updateUser = {...user,...values}
       sessionStorage.setItem('user',JSON.stringify(updateUser))
       history.push(`/${updateUser.fullName.replace(/ /g,"_")}`)
    }

	  const { handleSubmit, register, errors } = useForm();

	  return (
	  	<div className="col-lg-3 jumbotron offset-lg-4 center mt-50">
	  	<h2>Edit Profile</h2>
	    <form onSubmit={handleSubmit(submit)}>
	          <div className="form-group">
	          <label>FullName</label><br/>
		      <input
		        name="fullName"
		        className="form-control"
		        defaultValue={user.fullName}
		        ref={register({
		          required: "Required",
		          
		        })}
		      />
		      {errors.fullName && errors.fullName.message}
		      </div>
		      <div className="form-group">
		      <label>Status</label><br/>

		      <select
		        name="status"
		       	className="form-control"
		        value={status || user.status}
		        onChange={(e) => setStatus(e.target.value)}
		        ref={register({
		          required: "Required",
		        })}
		      >
			      
			      <option value="Travelling">Travelling</option>
			      <option value="Busy">Busy</option>
			      <option value="Working">Working</option>
			   </select>
		      {errors.status && errors.status.message}
		      </div>
		      <div className="form-group">
		      <button type="submit">Update</button>
		      </div>
		    </form>
		  </div>
	  )
}


export { AccountSetting };