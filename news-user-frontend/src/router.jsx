import React from 'react'
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import Login from './pages/login/login'
import App from './App'
import Main from './components/Main/index'
import cookie from 'react-cookies'
import News from './pages/news/index'
import NewsAddOrEditor from './pages/news/addOrEditor'
import Personal from './pages/personal/index'

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
                                    <Route path='/main/news' component={News}/>
                                    <Route path='/main/editorNews/:newsId' component={NewsAddOrEditor}/>
                                    <Route path='/main/personal' component={Personal}/>
                                    <Redirect to='/main/news'/>
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