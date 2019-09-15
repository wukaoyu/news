import React from 'react'
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import Login from './pages/login/login'
import App from './App'
import Main from './components/Main/index'
import AdminAccount from './pages/accountManege/adminAccount/index'

export default class Router extends React.Component {
    render () {
        return (
            <HashRouter>
                <App>
                    <Switch>
                        <Route path='/main' render={() => 
                            <Main>
                                <Switch>
                                    <Route path='/main/account' component={AdminAccount}/>
                                    <Redirect to='/main/account'/>
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