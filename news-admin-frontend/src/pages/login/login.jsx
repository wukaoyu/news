import React from 'react'
import { Button, Form, Input, Icon, message } from 'antd'
import './login.less'
import { login } from '../../api/user'
import cookie from 'react-cookies'

const FormItem = Form.Item

class Login extends React.Component {
    // 登录函数
    userLogin = () => {
        console.log(cookie.load('userInfo'))
        let userInfo = this.props.form.getFieldsValue();
        login(userInfo).then(res => {
            if (res.errno === 0) {
                cookie.save('userInfo', res.data);
                message.success('登录成功')
            }else {
                message.error(res.data)
            }
        })
    }   

    render () {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 8 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 16 },
            },
          };
          const tailFormItemLayout = {
            wrapperCol: {
              xs: {
                span: 24,
                offset: 0,
              },
              sm: {
                span: 16,
                offset: 8,
              },
            },
          };
        return (
            <div className="login-center">
                <Form {...formItemLayout} className="login-box">
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
                    <FormItem {...tailFormItemLayout}>
                        <Button type="primary" onClick={this.userLogin}>登录</Button>
                        <Button style={{margin:'20px'}}>重置</Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}
export default Form.create()(Login);