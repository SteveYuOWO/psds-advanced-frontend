import React, { Component } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import ChooseApi from '../api/ChooseApi'
import ChoosePic from '../assets/plus.png'
import UnChoosePic from '../assets/minus.png'
import Navigation from '../components/Navigation'
import SideBar from '../components/SideBar'
import Table from '../components/Table'
import WelcomeTitle from '../components/WelcomeTitle'
import { confirmAlert } from 'react-confirm-alert'
import UpdatePersonalInfoView from '../components/UpdatePersonalInfoView'
import ChangePasswordView from '../components/ChangePasswordView'
import Star from '../assets/star.png'

export class TeacherHomePage extends Component {
    constructor() {
        super()
        // Binding Functions
        this.changeTable = this.changeTable.bind(this)
        // States
        this.state = {
            dataType: "被选名单",
            tableHead: "",
            tableData: "",
            pages: "",
            loading: false
        }
    }

    componentDidMount() {
        this.studentTableData().then(() => {
            this.setState({ loading: false })
        })
    }

    teacherChooseStudent = (chooseId, studentName) => {
        confirmAlert({
            title: '提示',
            message: `确定选择${studentName}作为学生?`,
            buttons: [
                {
                    label: '是',
                    onClick: () => {
                        this.setState({ loading: true }, () => {
                            ChooseApi.teacherChooseStudent(chooseId).then(res => {
                                toast.success(res.data)
                                this.studentTableData()
                                this.setState({ loading: false })
                            })
                        })
                    }
                },
                {
                    label: '否',
                    onClick: () => {
                    }
                }
            ]
        });
    }

    teacherUnChooseStudent = (chooseId, studentName) => {
        confirmAlert({
            title: '提示',
            message: `确定取消选择${studentName}作为学生?`,
            buttons: [
                {
                    label: '是',
                    onClick: () => {
                        this.setState({ loading: true }, () => {
                            ChooseApi.teacherUnChooseStudent(chooseId).then(res => {
                                toast.success(res.data)
                                this.studentTableData()
                                this.setState({ loading: false })
                            })
                        })
                    }
                },
                {
                    label: '否',
                    onClick: () => {
                    }
                }
            ]
        });
    }

    studentTableData = async () => {
        let userId = JSON.parse(localStorage.getItem('user')).user.id;
        var pages = [], tableData = []
        await ChooseApi.getAllChoosesByTeacherId(this.state.page, this.state.size, userId).then((res) => {
            localStorage.setItem('totalPages', res.data.totalPages)

            res.data.content.forEach((ele, index) => {
                var statusData = '已被选择'
                if (ele['status'] === 1) statusData = '已选择'
                else if (ele['status'] === 2) statusData = <img width="23px" src={Star} alt='unchoose'/>

                var choosePicture = ''
                if (ele['status'] === 0) choosePicture = <img width="23px" src={ChoosePic} alt='unchoose'
                    onClick={() => this.teacherChooseStudent(ele['id'], ele['student']['name'])} />
                else if (ele['status'] === 1) choosePicture = <img width="23px" src={UnChoosePic} alt='unchoose'
                    onClick={() => this.teacherUnChooseStudent(ele['id'], ele['student']['name'])} />

                var tmp = (<tr key={index}>
                    <td>{ele['id']}</td>
                    <td>{ele['student']['name']}</td>
                    <td>{ele['student']['sex']}</td>
                    <td>{ele['student']['stuNum']}</td>
                    <td>{ele['student']['major']}</td>
                    <td>{ele['student']['email']}</td>
                    <td>{ele['student']['info']}</td>
                    <td>{statusData}</td>
                    <td className='link'>{choosePicture}</td>
                </tr>)
                tableData.push(tmp)
            })
            pages.push(
                <div key={0}
                    onClick={() => {
                        this.setState({ page: 0, loading: true }, () => {
                            this.studentTableData().then(() => {
                                this.setState({ loading: false })
                            })
                        })
                    }}
                    className="btn-group mr-2" role="group" aria-label="First group">
                    <button type="button" className="btn-pagenum">首页</button>
                </div>
            )
            for (let i = 1; i <= localStorage.getItem('totalPages'); i++) {
                pages.push(
                    <div key={i}
                        onClick={() => {
                            this.setState({ page: i - 1, loading: true }, () => {
                                this.studentTableData().then(() => {
                                    this.setState({ loading: false })
                                })
                            })
                        }}
                        className="btn-group mr-2" role="group" aria-label="Second group">
                        <button type="button" className="btn-pagenum">{i}</button>
                    </div>
                )
            }
            pages.push(
                <div key={localStorage.getItem('totalPages') + 1}
                    onClick={() => {
                        this.setState({ page: localStorage.getItem('totalPages') - 1, loading: true }, () => {
                            this.studentTableData().then(() => {
                                this.setState({ loading: false })
                            })
                        })
                    }}
                    className="btn-group mr-2" role="group" aria-label="First group">
                    <button type="button" className="btn-pagenum">尾页</button>
                </div>
            )
        })

        this.setState({
            tableData: tableData,
            pages: pages,
            tableHead: [(<tr key={0}>
                <td>编号</td>
                <td>姓名</td>
                <td>性别</td>
                <td>学号</td>
                <td>专业</td>
                <td>邮箱</td>
                <td>个人简介</td>
                <td>状态</td>
                <td></td>
            </tr>)]
        })
    }

    /**
     * When we choose the index we need to determine
     * the data of the table
     *
     * @param {the choose of index} index
     */
    changeTable(index) {
        if (index === 9) {
            this.setState({
                dataType: "被选名单",
                loading: true
            }, () => {
                this.studentTableData().then(() => {
                    this.setState({ loading: false })
                })
            })
        } else if (index === 10) {
            this.setState({
                dataType: '个人信息修改'
            })
        } else if (index === 11) {
            this.setState({
                dataType: '密码修改'
            })
        }
    }


    render() {

        var mainView = <Table
            dataType={this.state.dataType}
            tableHead={this.state.tableHead}
            tableData={this.state.tableData}
            pages={this.state.pages}
            loading={this.state.loading} />
        if (this.state.dataType === '个人信息修改') {
            mainView = <UpdatePersonalInfoView />
        } else if (this.state.dataType === '密码修改') {
            mainView = <ChangePasswordView />
        }
        return (<div>
            <ToastContainer />
            <Navigation showLogoutBtn={true} className='shadow' />
            <div className="container-fluid">
                <div className="row">
                    {/* 侧边栏 */}
                    <div className="col-md-2 left-bar">
                        <div className="mtem-2 plem-1">
                            <p className="gray plem-1 left-bar-title">
                                <i className="fa fa-align-justify prem-1 mrem-1"></i>功能列表
                                </p>
                        </div>
                        <SideBar initIndex={9} changeTable={this.changeTable} />
                        <br />
                        <hr />
                    </div>
                    <div className="col-md-10">
                        {/* 欢迎界面 */}
                        <WelcomeTitle />
                        <hr />
                        {mainView}
                    </div>
                </div>
            </div>
        </div>)
    }
}

export default TeacherHomePage
