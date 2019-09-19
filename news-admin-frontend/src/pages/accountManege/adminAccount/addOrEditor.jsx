import React from 'react'
import { Form, Input, Icon, message} from 'antd'
const FormItem = Form.Item

class addOrEditor extends React.Component {
    constructor(props){
        super(props);
    }

    change=()=>{
        let userInfo = this.props.form.getFieldsValue();
        console.log(userInfo)
        this.props.callback(userInfo);
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 6 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 18 },
            },
        };
        const defaultCity = ["陕西省", "西安市", "碑林区"];
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
                <FormItem label='城市：'>
                {
                    getFieldDecorator('city', {
                        initialValue: this.props.userInfo.city,
                        rules: [
                            {
                                required: true,
                                message: '请输入正确的城市地址!',
                            },]
                    })(
                        <Input onBlur={this.change} prefix={<Icon type="bank"/>} placeholder='请输入姓名'/>
                    )
                }
                </FormItem>
            </Form>
        )
    }
}


export default Form.create()(addOrEditor);