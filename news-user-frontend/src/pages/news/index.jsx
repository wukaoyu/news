import React from 'react'
import { Form, Input, Icon, Table, Button, Select, Modal, message} from 'antd'
import { getNewsPage, deleteNews } from '../../api/news'
import cookie from 'react-cookies'
import './index.less'
const FormItem = Form.Item
const { Option } = Select;
class userAccount extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            dataSource: [],
            adminList: [],
            pageData:{
                pageSize:10,// 每页条数
                current: 1,// 当前页数
                total: 0,// 数据总数
            },
            userData: {}
        }
    }
    UNSAFE_componentWillMount() {
        this.fungetNewsPage(this.state.pageData)
        // this.friends.setFriends ()
    }

    // 获取分页信息
    fungetNewsPage = (data) => {
        getNewsPage(data).then(res => {
            const result = res.list
            if (result.errno === 0) {
                let keyIndex = 0
                result.data.forEach(item => {
                    keyIndex++;
                    item.key = keyIndex
                })
                let newPageData = Object.assign({}, this.state.pageData, { total: res.total })
                this.setState({
                    dataSource:result.data,
                    pageData: newPageData
                })
            }
        })
    }

    // 改变每页数据
    changePageSize = (pageSize,current) => {
        console.log(pageSize)
    }
    // 翻页
    changePage = (current) => {
        let data = Object.assign({}, this.state.pageData, { current })
        this.setState({
            pageData: data
        })
    }
    // 获取所有管理员组件
    renderAdminMeun = () => {
        return this.state.adminList.map(item => {
            return(
                <Option value={item.id} key={item.id}>{item.name}</Option>
            )
        })
    }

    //点击删除按钮
    handDelete = (recore) => {
        const _this = this
        Modal.confirm({
            title:"警告!!",
            content:"删除后数据将无法复原，确认删除吗？",
            onOk() {
                deleteNews({id:recore.id}).then(res => {
                    if (res.errno === 0) {
                        message.success("删除成功")
                        _this.fungetNewsPage(_this.state.pageData)
                    }
                })
            },
        })
    }

    callback = (userData) => {
        this.setState({
            userData
        })
    }

    //增加或修改用户信息
    handAddOrEditor = (data={}) => {
        const _this = this
        let thisData = {}
        thisData.name = data.name
        thisData.username = data.username
        this.setState({
            userData: thisData
        })
        if (data.id) {
            window.location.href = `/#/main/editorNews/${data.id}`
        } else {
            this.props.history.push('/main/addNews')
        }
    }

    render() {
        const paginationProps = {
            showSizeChanger: true,
            showQuickJumper: false,
            showTotal: () => `共${this.state.pageData.total}条`,
            onShowSizeChange: (current,pageSize) => this.changePageSize(pageSize,current),
            onChange: (current) => this.changePage(current),
            ...this.state.pageData
        };
        const columns = [
            {
                title: '序号',
                render:(text,record,index)=>`${index+1}`,
                key: 'list',
                align: 'center',
                width:150,
            },
            {
                title: '新闻标题',
                dataIndex: 'name',
                key: 'name',
                align: 'center',
                width:150,
            },
            {
                title: '创建时间',
                dataIndex: 'createtime',
                key: 'createtime',
                align: 'center'
            },
            {
                title: '创建人',
                dataIndex: 'create_username',
                key: 'create_username',
                align: 'center',
                width:150,
            },
            {
                title: '操作',
                align: 'center',
                width:250,
                render:(text,recore) => (
                    <div className="table-operation">
                        <Button type="primary" onClick={ () => this.handAddOrEditor(recore)}>修改</Button>
                        <Button type="danger" onClick={() => this.handDelete(recore)}>删除</Button>
                    </div>
                )
            },
          ];
        return (
            <div>
                <Form layout="inline">
                    <FormItem>
                        <Button type="primary" onClick={ () => this.handAddOrEditor()}>新增</Button>
                    </FormItem>
                </Form>
                <Table 
                    pagination={ paginationProps }
                    className="main-table"
                    scroll={{ y: 'calc(100vh - 300px)' }}
                    rowKey={record => record.id} 
                    dataSource={this.state.dataSource} 
                    columns={columns} />
            </div>
        )
    }
}
export default Form.create()(userAccount);