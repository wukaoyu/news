import React from 'react'
import './index.less'
import {Menu} from 'antd'
import { NavLink } from 'react-router-dom'
export default class Footer extends React.Component {
    render() {
        return(
            <div className="footer">
                <Menu theme="dark" mode="horizontal">
                    <Menu.Item style={{width:"50%"}} title='新闻'>
                        <NavLink to="/main/news">新闻</NavLink>
                    </Menu.Item>
                    <Menu.Item style={{width:"50%"}} title='我的'>
                        <NavLink to="/main/personal">我的</NavLink>
                    </Menu.Item>
                </Menu>
            </div>
        );
    }
}