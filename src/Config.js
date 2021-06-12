import React, { Component } from 'react'
import {Route,Switch} from "react-router-dom";
import Home from './screens/home/Home';
import Profile from './screens/profile/Profile';

export class Config extends Component {
    constructor() {
        super();
        this.baseUrl = "http://localhost:8080/api/";
        this.state = {
            loggedIn: sessionStorage.getItem('access-token') == null ? false : true
          };
      }
    render() {
        return (
            <div>
                <Switch>
                <Route exact path='/' render={(props) => <Home {...props} baseUrl={this.baseUrl}/>}/>
                <Route exact path='/profile' render={(props) => <Profile {...props} />}/>
                </Switch>
            </div>
        )
    }
}

export default Config
