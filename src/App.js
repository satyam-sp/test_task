import React, { useEffect } from 'react';
import { Router, Route, Switch,Redirect } from 'react-router-dom';
import { history } from './helpers';
import { LoginPage } from './components/LoginPage';
import { MainPage } from './components/MainPage';
import {PrivateRoute} from './components/auth/PrivateRoute';

import {AccountSetting} from './components/AccountSetting';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import './App.css'
function App() {
  global.RG ={currentUser: sessionStorage.user && JSON.parse(sessionStorage.user)}
  let username = global.RG.currentUser && `${  global.RG.currentUser.fullName.replace(' ', '_')}`
    return (
      <div className="col-md-12">
        <Router history={history}>
          <Switch>
            <Route exact path="/" render={(props) =>  (
                global.RG.currentUser ? 
                   <Redirect to={`/${username}`} /> : <Redirect to='/login'/>
                
              )} authenticated={(global.RG.currentUser) ? true : false} />
            <Route exact path="/login" component={LoginPage} />
            <PrivateRoute exact path="/:username" component={MainPage} />
            <PrivateRoute exact path="/:username/edit"  component={AccountSetting} />
          </Switch>
        </Router>
      </div>
    );
}

export default App ;