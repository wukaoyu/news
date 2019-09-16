import React from 'react'
import {Menu, Icon} from 'antd'
import './index.less'
import { NavLink } from 'react-router-dom'
import MenuConfig from '../../config/menuConfig'
const SubMenu = Menu.SubMenu;

export default class NavLeft extends React.Component {
    UNSAFE_componentWillMount() {
        const menuTree = this.renderMenu(MenuConfig)
        this.setState({
            menuTree
        })
    }
    renderMenu = (data) => {
        return data.map(item => {
            if (item.children) {
                return (
                    <SubMenu key={item.key} title={item.title}>
                        {this.renderMenu(item.children)}
                    </SubMenu>
                )
            }
            return (
                <Menu.Item key={item.key} title={item.title}>
                    <NavLink to={item.key}>{item.title}</NavLink>
                </Menu.Item>
            )
        })
    }
    render() {
        return (
            <div>
                <div className="logo">
                    <img src="/assets/logo-ant.svg"/>
                    <h1>热点新闻管理</h1>
                </div>  
                <Menu theme="dark">
                    { this.state.menuTree }
                </Menu>
            </div>
        )
    }
}