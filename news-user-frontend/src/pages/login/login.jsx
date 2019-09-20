import React from 'react'
import { Button, Form, Input, Icon, message } from 'antd'
import './login.less'
import { userLogin } from '../../api/user'
import cookie from 'react-cookies'

const FormItem = Form.Item

class Login extends React.Component {

  constructor(props) {
    super(props)
    if (cookie.load('userInfo')) {
        this.props.history.push('/main')
    }
  }
    // 登录函数
    userLogin = () => {
        let userInfo = this.props.form.getFieldsValue();
        let expires = new Date()
        expires.setDate(Date.now() + 1000 * 60 * 60 * 24 * 14)
        userLogin(userInfo).then(res => {
            if (res.errno === 0) {
                cookie.save('userInfo', res.data, {
                    expires: expires,
                    maxAge: 10000,
                });
                this.props.history.push('/main')
                message.success('登录成功')
            }else {
                message.error(res.data)
            }
        })
    }   

    render () {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login-center">
                <Form  className="login-box">
                    <FormItem
                        label='用户名:'
                        className="login-item">
                        {
                            getFieldDecorator('username', {
                                initialValue: '',
                                rules: []
                            })(
                                <Input prefix={<Icon type="user"/>} placeholder='请输入用户名'/>
                            )
                        }
                    </FormItem>
                    <FormItem
                        label='密码：'
                        className="login-item">
                        {
                            getFieldDecorator('password', {
                                initialValue: '',
                                rules: []
                            })(
                                <Input type='password' prefix={<Icon type="lock"/>} placeholder='请输入密码'/>
                            )
                        }
                    </FormItem>
                    <FormItem >
                        <Button type="primary" onClick={this.userLogin}>登录</Button>
                        <Button style={{margin:'20px'}}>重置</Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}
export default Form.create()(Login);