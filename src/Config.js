import React, { Component } from 'react'
import {Route,Switch} from "react-router-dom";
import Home from './screens/home/Home'

export class Config extends Component {
    render() {
        return (
            <div>
                <Switch>
                <Route exact path='/' render={(props) => <Home/>}/>
                </Switch>
            </div>
        )
    }
}

export default Config
