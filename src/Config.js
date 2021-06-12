import React, { Component } from 'react'
import {Route,Switch} from "react-router-dom";
import Home from './screens/home/Home'

export class Config extends Component {
    constructor() {
        super();
        this.baseUrl = "http://localhost:8080/api/";
      }
    render() {
        return (
            <div>
                <Switch>
                <Route exact path='/' render={(props) => <Home {...props} baseUrl={this.baseUrl}/>}/>
                </Switch>
            </div>
        )
    }
}

export default Config
