import React from 'react'
import { Form, Input, Icon} from 'antd'
const FormItem = Form.Item

class addOrEditor extends React.Component {
    constructor(props){
        super(props);
    }

    change=()=>{
        let userInfo = this.props.form.getFieldsValue();
        this.props.callback(userInfo);
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 5 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 19 },
            },
        };
        return (
            <Form {...formItemLayout} style={{marginTop:"50px"}}>
                <FormItem label='用户名:'>
                {
                    getFieldDecorator('username', {
                        initialValue: this.props.userInfo.username,
                        rules: [
                            {
                                required: true,
                                message: '请输入用户名!',
                            },
                        ]
                    })(
                        <Input onBlur={this.change} prefix={<Icon type="user"/>} placeholder='请输入用户名'/>
                    )
                }
                </FormItem>
                <FormItem label='姓名:'>
                {
                    getFieldDecorator('name', {
                        initialValue: this.props.userInfo.name,
                        rules: [
                            {
                                required: true,
                                message: '请输入姓名!',
                            },]
                    })(
                        <Input onBlur={this.change} prefix={<Icon type="idcard"/>} placeholder='请输入姓名'/>
                    )
                }
                </FormItem>
            </Form>
        )
    }
}


export default Form.create()(addOrEditor);