import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userActions,postActions } from '../actions';
import InfiniteScroll from 'react-infinite-scroller';

function MainPage(props) {
    const [inputs, setInputs] = useState({
        post_q: '',
        user_q: ''
    });
    const posts = useSelector(state => state.posts.posts);
    const users = useSelector(state => state.users.users);
    const [pageLoad ,setPageLoad]=useState(true)
    const [pageCount, setPageCount] = useState(1)
    const [user, setUser] = useState(sessionStorage.user && JSON.parse(sessionStorage.user))
    const { post_q, user_q } = inputs;
    const dispatch = useDispatch();

    useEffect(() => {
        checkRoute()
        dispatch(postActions.getAllPosts());
        dispatch(userActions.getAllUsers());
    }, []);
    
    function checkRoute(){
      if(window.location.pathname.split('/')[1] !==user.fullName.replace(/ /g,"_"))
        throw "Route mismatch"
    }
    function handleChange(e) {
      const { name, value } = e.target;
      setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    function findUser(e){
      dispatch(userActions.getAllUsers(user_q)); 
    }
    function getMyPosts() {
      dispatch(postActions.getMyPosts(user.id));
    }

    function searchBlog(e){
      dispatch(postActions.getAllPosts(post_q)); 
    }

    function loadFunc(e){
      if(e < posts.length/3){
        setPageCount(pageCount+1)
        setPageLoad(true)
      }else{
        setPageLoad(false)
      }
    }

    function getPosts(){
      const ups = [...posts]
      return ups.splice(0,4*pageCount)
    }

    function logout(){
      dispatch(userActions.logout())
    }

    return (
        <div className="">
        	<div className="header">
        	  <div className='row'>
        	  	<div className="col-md-6"><span className="user-heading">{`${user.fullName}`}</span></div>
        	  	<div className="col-md-6"><button onClick={logout} className="btn btn-primary btn-logout" >Logout</button></div>
        	  </div>
        	</div>
        	<div className="row">
        	  <div className="col-md-3 left-panel">
        	    <div className="left-panel-box">
        	      <img src={user.avatar} className="profile-image" width="165" height="200"/><br/>
        	      <div className="hd">
	        	      <span>{`${user.fullName}`}</span><br/>
	        	      <span>status: {user.status}</span>
        	      </div>
        	    </div>
        	    <div className="left-panel-box2">
        	      <a href="javascript:void(0)" onClick={getMyPosts}>my posts</a><br/>
        	      <Link to={`/${user.fullName.replace(/ /g,"_")}/edit`}>Account Setting</Link>
        	    </div>
        	  </div>
        	  <div className="col-md-5 mid-panel">
	        	  <div className="mid-panel-box">
	        	    <input type="text" name="post_q" className="form-control"onChange={handleChange} placeholder="Search by heading/content" />
	        	    <button className="btn btn-primary" onClick={searchBlog}>Search</button>
	        	    <div className="posts">
                <InfiniteScroll
                  pageStart={0}
                  initialLoad={false}
                  loadMore={(e) => loadFunc(e)}
                  hasMore={pageLoad}
                  loader={<div className="loader" key={0}></div>}
                  useWindow={false}
                  >
                  {getPosts().map((item,index) => {
                  	return(
                      <React.Fragment>
                    		<div key={index} className="post">
                    			<span>{item.heading}</span><br/>
                    			<span>{item.blog}</span>
                    		</div>
                        <hr />
                      </React.Fragment>)
                  })}
                  </InfiniteScroll>
	        	    </div>
	        	  </div>
	          </div>
        	  <div className="col-md-4 right-panel">
        	    <div className="right-panel-box">
                <input type="text" name="user_q" className="form-control" onChange={handleChange} placeholder="Search by username" />
                <button className="btn btn-primary" onClick={findUser}>Go</button>
                <div className="row users-sections">
                  {users.map((item,index) =>{
                   return item.id !== user.id ? (
                  <div class="col-sm-4 py-2">
                    <div class="card h-60">
                      <div class="card-body">
                          <img src={item.avatar} width="130" height="150" />
                          <p class="card-text">{item.fullName}</p>
                      </div>
                    </div>
                  </div>) :  null
                  })}
                  
                </div>
              </div>
        	  </div>
        	</div>
            <div className="footer">
        	</div>
     
        </div>
    );
}

export { MainPage };