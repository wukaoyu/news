import React from 'react'
import { Form, List, Icon, Avatar, Button, Select, Modal, message} from 'antd'
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
        console.log("123")
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
        const listData = [];
        for (let i = 0; i < 23; i++) {
        listData.push({
            href: 'http://ant.design',
            title: `ant design part ${i}`,
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            description:
            'Ant Design, a design language for background applications, is refined by Ant UED Team.',
            content:
            'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
        });
        }
        return (
            <div>
                <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                    onChange: page => {
                        console.log(page);
                    },
                    pageSize: 10,
                    }}
                    dataSource={this.state.dataSource}
                    footer={
                    <div>
                        <b>ant design</b> footer part
                    </div>
                    }
                    renderItem={item => (
                    <List.Item
                        key={item.title}
                        extra={
                        <div>
                            <img
                                width={272}
                                alt="logo"
                                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                            />
                            <p className="news-content">{item.name}</p>
                        </div>
                        }
                    >
                    <List.Item.Meta
                        avatar={<Avatar src={item.avatar} />}
                        title={<a href={item.href}>{item.title}</a>}
                        description={item.description}
                        />
                        {item.content}
                    </List.Item> )}
                />,
            </div>
        )
    }
}
export default Form.create()(userAccount);