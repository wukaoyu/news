import React from 'react'
import { Button, Form, Input, message } from 'antd'
import cookie from 'react-cookies'
import './index'
import { updataPerson, getPerson } from '../../api/user'

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

    //查询个人信息

    funGetPerson = () => {
        let expires = new Date()
        expires.setDate(Date.now() + 1000 * 60 * 60 * 24 * 14)
        getPerson({id:this.state.userInfo.id}).then(res => {
            if (res.errno === 0) {
                cookie.save('userInfo', res.data[0]);
            }
        })
    }

    // 修改个人信息
    updataPerson = () => {
        let userInfo = this.props.form.getFieldsValue();
        userInfo.id = this.state.userInfo.id
        console.log(userInfo)
        updataPerson(userInfo).then(res => {
            if (res.errno === 0) {
                message.success("修改成功")
                this.funGetPerson()
            }
        })
    }
    back = () => {
        this.props.history.push('/main/password')
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
                <Form {...formItemLayout} >
                    <FormItem
                        label='姓名：'
                        className="login-item">
                        {
                            getFieldDecorator('name', {
                                initialValue: this.state.userInfo.name,
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入姓名',
                                    }
                                ]
                            })(
                                <Input  placeholder='请输入姓名'/>
                            )
                        }
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        <Button type="primary" onClick={this.updataPerson}>确认</Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}
export default Form.create()(personal);