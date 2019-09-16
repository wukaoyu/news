import React from 'react'
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import Login from './pages/login/login'
import App from './App'
import Main from './components/Main/index'
import cookie from 'react-cookies'
import AdminAccount from './pages/accountManege/adminAccount/index'
import UserAccount from './pages/accountManege/userAccount/index'

export default class Router extends React.Component {
    constructor(props) {
        super(props)
        if (!cookie.load('userInfo')) {
            window.location.href = '/#/';
        }
    }
    render () {
        return (
            <HashRouter>
                <App>
                    <Switch>
                        <Route path='/main' render={() => 
                            <Main>
                                <Switch>
                                    <Route path='/main/account/user' component={UserAccount}/>
                                    <Route path='/main/account/admin' component={AdminAccount}/>
                                    <Redirect to='/main/account/user'/>
                                </Switch>
                            </Main>
                        }/>
                        <Route path='/' component={Login}/>
                    </Switch>
                </App>
            </HashRouter>
        )
    }
}