import React from 'react'
import {Row, Col} from 'antd'
import NavLeft from '../NavLeft/index'
import Header from '../Header/index'
import Footer from '../Footer/index'
import ScrollView from 'react-custom-scrollbars'
import './index.less'

export default class Main extends React.Component {
    render() {
        return (
            <Row>
                <Col span={4} className="nav-left">
                    <NavLeft/>
                </Col>
                <Col span={20} className="cont-main">
                    <Header/>
                    <Row className="cont-content">
                        <div className="content-scroll"> 
                            <ScrollView>
                                {this.props.children}
                            </ScrollView>
                        </div>
                    </Row>
                    <Footer/>
                </Col>
            </Row>
        )
    }
}