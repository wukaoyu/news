import React from 'react'
import { Row,Col } from "antd"
import './index.less'
import Util from '../../util/util'
import axios from '../../axios'
import cookie from 'react-cookies'
export default class Header extends React.Component{
    state={
        userInfo: cookie.load("userInfo")
    }
    componentWillMount(){
        this.setState({
            userName:this.state.userInfo.name
        })
        setInterval(()=>{
            let sysTime = Util.formateDate(new Date().getTime());
            this.setState({
                sysTime
            })
        },1000);
    }
    loginOut = () => {
        cookie.remove("userInfo")
    }
    render(){
        return (
            <div className="header">
                <Row className="header-top">
                        <Col span={9}>
                            <span>欢迎，{this.state.userName}</span>
                        </Col>
                        <Col span={10} style={{
                            textAlign:"right"
                        }}>
                            <span className="date">{this.state.sysTime}</span>
                            <span className="weather-img">
                                <img src={this.state.dayPictureUrl} alt="" />
                            </span>
                        </Col>
                        <Col span={5}>
                            <a href="/" onClick={this.loginOut}>退出</a>
                        </Col>
                </Row>
            </div>
        );
    }
}