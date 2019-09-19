import React from 'react'
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import Login from './pages/login/login'
import App from './App'
import Main from './components/Main/index'
import cookie from 'react-cookies'
import AdminAccount from './pages/accountManege/adminAccount/index'
import UserAccount from './pages/accountManege/userAccount/index'
import News from './pages/news/index'
import NewsAddOrEditor from './pages/news/addOrEditor'
import Personal from './pages/personal/index'
import UpdatePsw from './pages/personal/updataPassword'

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
                                    <Route path='/main/news' component={News}/>
                                    <Route path='/main/editorNews/:newsId' component={NewsAddOrEditor}/>
                                    <Route path='/main/addNews' component={NewsAddOrEditor}/>
                                    <Route path='/main/personal' component={Personal}/>
                                    <Route path='/main/password' component={UpdatePsw}/>
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