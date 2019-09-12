import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'
import Login from './pages/login/login'
import App from './App'

export default class Router extends React.Component {
    render () {
        return (
            <HashRouter>
                <App>
                    <Switch>
                        <Route path='/' component={Login}/>
                    </Switch>
                </App>
            </HashRouter>
        )
    }
}