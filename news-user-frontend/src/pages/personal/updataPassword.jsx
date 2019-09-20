import React from 'react'
import { Button, Form, Input, message } from 'antd'
import cookie from 'react-cookies'
import './index'

const FormItem = Form.Item
const Textarea = Input.TextArea

class personal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userInfo:cookie.load("userInfo")
        }
    }  
    UNSAFE_componentWillMount() {
        
    }
    
    back = () => {
        this.props.history.push('/main/personal')
    }
    render () {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 4 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 20 },
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
            <div className="news-center">
                <Form {...formItemLayout} className="login-box">
                    <FormItem
                        label='原密码：'
                        className="login-item">
                        {
                            getFieldDecorator('title', {
                                initialValue: "",
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入原密码',
                                    }
                                ]
                            })(
                                <Input  placeholder='请输入原密码'/>
                            )
                        }
                    </FormItem>
                    <FormItem
                        label='新密码：'
                        className="login-item">
                        {
                            getFieldDecorator('content', {
                                initialValue: "",
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入新密码',
                                    }
                                ]
                            })(
                                <Input autosize={true} placeholder='请输入新密码'/>
                            )
                        }
                    </FormItem>
                    <FormItem
                        label='确认密码：'
                        className="login-item">
                        {
                            getFieldDecorator('content', {
                                initialValue: "",
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入新密码',
                                    }
                                ]
                            })(
                                <Input autosize={true} placeholder='请输入新密码'/>
                            )
                        }
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        <Button type="primary" onClick={this.submitData}>确认</Button>
                        <Button style={{margin:'20px'}} onClick={this.back}>返回</Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}
export default Form.create()(personal);