import React from 'react'
import {Row, Col} from 'antd'

export default class NavLeft extends React.Component {
    render() {
        return (
            <Row>
                <Col span={4}>
                    侧边栏
                </Col>
                <Col span={20}>
                    1
                    {this.props.children}
                </Col>
            </Row>
        )
    }
}