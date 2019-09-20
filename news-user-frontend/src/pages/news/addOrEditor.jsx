import React from 'react'
import { Button, Form, Input, message } from 'antd'
import { insertNews, getOneNew, updataNews } from '../../api/news'
import cookie from 'react-cookies'
import './index'

const FormItem = Form.Item
const Textarea = Input.TextArea

class addOrEditor extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            newsInfo:{}
        }
    }  
    UNSAFE_componentWillMount() {
        if (this.props.match.params.newsId) {
            getOneNew({id:this.props.match.params.newsId}).then(res => {
                if (res.errno === 0) {
                    this.setState({
                        newsInfo:res.data
                    })
                }
            })
        }
    }

    submitData = () => {
        let newsData = this.props.form.getFieldsValue();
        this.props.form.validateFields((err, fieldsValue) => {
            if (err) {
                return;
            }
            if (this.props.match.params.newsId) {
                newsData.id = this.props.match.params.newsId
                updataNews(newsData).then(res => {
                    if (res.errno === 0) {
                        message.success("修改成功！")
                        this.props.history.push('/main/news')
                    }
                })
            }else {
                newsData.createby = cookie.load("userInfo").id
                insertNews(newsData).then(res => {
                    if (res.errno === 0) {
                        message.success("添加成功！")
                        this.props.history.push('/main/news')
                    }
                })
            }
        })
    }
    back = () => {
        this.props.history.push('/main/news')
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
                        label='新闻标题:'
                        className="login-item">
                        {
                            getFieldDecorator('title', {
                                initialValue: this.state.newsInfo.name,
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入标题',
                                    }
                                ]
                            })(
                                <Input  placeholder='请输入新闻标题'/>
                            )
                        }
                    </FormItem>
                    <FormItem
                        label='新闻内容：'
                        className="login-item">
                        {
                            getFieldDecorator('content', {
                                initialValue: this.state.newsInfo.content,
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入内容',
                                    }
                                ]
                            })(
                                <Textarea autosize={true} className="news-textarea" placeholder='请输入新闻内容'/>
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
export default Form.create()(addOrEditor);