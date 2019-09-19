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
        },1000)
        this.getWeatherAPIData();
    }

    getWeatherAPIData(){
        let city = this.state.userInfo.city;
        axios.jsonp({
            url:'http://api.map.baidu.com/telematics/v3/weather?location='+encodeURIComponent(city)+'&output=json&ak=3p49MVra6urFRGOT9s8UBWr2'
        }).then((res)=>{
            if(res.status == 'success'){
                let data = res.results[0].weather_data[0];
                this.setState({
                    dayPictureUrl:data.dayPictureUrl,
                    weather:data.weather
                })
            }
        })
    }
    loginOut = () => {
        cookie.remove("userInfo")
    }
    render(){
        return (
            <div className="header">
                <Row className="header-top">
                        <Col span={6}>
                            <span>欢迎，{this.state.userName}</span>
                        </Col>
                        <Col span={14} style={{
                            textAlign:"right"
                        }}>
                            <span className="date">{this.state.sysTime}</span>
                            <span className="weather-img">
                                <img src={this.state.dayPictureUrl} alt="" />
                            </span>
                            <span className="weather-detail">
                                {this.state.weather}
                            </span>
                        </Col>
                        <Col span={4}>
                            <a href="/" onClick={this.loginOut}>退出</a>
                        </Col>
                </Row>
            </div>
        );
    }
}