import React, {Component} from 'react'
import TeacherApi from '../api/TeacherApi'
import ChoosePic from '../assets/plus.png'
import UnChoosePic from '../assets/minus.png'
import ChooseApi from '../api/ChooseApi'
import Navigation from '../components/Navigation'
import SideBar from '../components/SideBar'
import Table from '../components/Table'
import WelcomeTitle from '../components/WelcomeTitle'
import {confirmAlert} from 'react-confirm-alert'
import {ToastContainer, toast} from 'react-toastify';
import ChangePasswordView from '../components/ChangePasswordView'
import UpdatePersonalInfoView from '../components/UpdatePersonalInfoView'
import Star from '../assets/star.png'

export class StudentHomePage extends Component {
    constructor() {
        super()
        // Binding Functions
        this.changeTable = this.changeTable.bind(this)
        // this.teacherTableData = this.teacherTableData.bind(this)
        // States
        this.state = {
            // tableDataType: "student",
            dataType: "导师选择",
            tableHead: "",
            tableData: "",
            pages: "",
            loading: false
        }
    }

    /**
     * When we choose the index we need to determine
     * the data of the table
     *
     * @param {the choose of index} index
     */
    changeTable(index) {
        if (index === 5) {
            this.setState({
                dataType: '导师信息',
                loading: true
            }, () => {
                this.teacherTableData().then(() => {
                    this.setState({loading: false})
                })
            })
        } else if (index === 6) {
            this.setState({
                dataType: '志愿查看',
                loading: true
            }, () => {
                this.getAllChoosesTableData().then(() => {
                    this.setState({loading: false})
                })
            })
        } else if (index === 7) {
            this.setState({
                dataType: '个人信息修改',
                loading: true
            })
        } else if (index === 8) {
            this.setState({
                dataType: '密码修改',
                loading: true
            })
        } 
    }

    getAllChoosesTableData = async (page = 0, size = 10) => {
        let studentId = JSON.parse(localStorage.getItem('user')).user.id
        var tableData = [], pages = []
        await ChooseApi.getAllChooses(page, size, studentId).then(res => {
            localStorage.setItem('totalPages', res.data.totalPages)
            res.data.content.forEach((ele, index) => {
                var statusData = '已选择'
                if(ele['status'] === 1) statusData = '已被选择'
                else if(ele['status'] === 2) statusData = <img width="23px" src={Star} alt='unchoose'/>
                var tmp = (<tr key={index}>
                    <td>{ele['teacher']['id']}</td>
                    <td>{ele['teacher']['name']}</td>
                    <td>{ele['teacher']['sex']}</td>
                    <td>{ele['teacher']['teaNum']}</td>
                    <td>{ele['teacher']['major']}</td>
                    <td>{ele['teacher']['email']}</td>
                    <td>{ele['teacher']['info']}</td>
                    <td>{statusData}</td>
                    <td className='link'>{ele['status'] === 0 ? <img width="23px" src={UnChoosePic} alt='unchoose'
                             onClick={() => this.unchooseTeacher(ele['teacher']['id'], ele['teacher']['name'])}/>: ''}</td>
                </tr>)
                tableData.push(tmp);
            })

            pages.push(
                <div key={0}
                     onClick={() => {
                         this.setState({page: 0, loading: true}, () => {
                             this.getAllChoosesTableData().then(() => {
                                 this.setState({loading: false})
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
                             this.setState({page: i - 1, loading: true}, () => {
                                 this.getAllChoosesTableData().then(() => {
                                     this.setState({loading: false})
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
                         this.setState({page: localStorage.getItem('totalPages') - 1, loading: true}, () => {
                             this.getAllChoosesTableData().then(() => {
                                 this.setState({loading: false})
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
                <th>编号</th>
                <th>姓名</th>
                <th>性别</th>
                <th>教工号</th>
                <th>专业</th>
                <th>邮箱</th>
                <th>个人简介</th>
                <th>状态</th>
                <th></th>
            </tr>)]
        })
    }

    chooseTeacher = (teacherId, teacherName) => {
        let studentId = JSON.parse(localStorage.getItem('user')).user.id

        confirmAlert({
            title: '提示',
            message: `确定选择${teacherName}作为导师?`,
            buttons: [
                {
                    label: '是',
                    onClick: () => {
                        this.setState({loading: true}, () => {
                            ChooseApi.studentChooseTeacher(studentId, teacherId).then(res => {
                                toast.success(res.data)
                                this.teacherTableData()
                                this.setState({loading: false})
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

    unchooseTeacher = (teacherId, teacherName) => {
        let studentId = JSON.parse(localStorage.getItem('user')).user.id

        confirmAlert({
            title: '提示',
            message: `确定移除${teacherName}作为导师?`,
            buttons: [
                {
                    label: '是',
                    onClick: () => {
                        this.setState({loading: true}, () => {
                            ChooseApi.removeChoose(studentId, teacherId).then(res => {
                                toast.success(res.data)
                                this.getAllChoosesTableData()
                                this.setState({loading: false})
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

    teacherTableData = async () => {
        var pages = [], tableData = []
        let major = JSON.parse(localStorage.getItem('user')).user.major
        await TeacherApi.getTeacherTableDataByMajor(this.state.page,
            this.state.size, major).then((res) => {
            localStorage.setItem('totalPages', res.data.totalPages)
            res.data.content.forEach((ele, index) => {
                var tmp = (<tr key={index}>
                    <td>{ele['id']}</td>
                    <td>{ele['name']}</td>
                    <td>{ele['sex']}</td>
                    <td>{ele['teaNum']}</td>
                    <td>{ele['major']}</td>
                    <td>{ele['email']}</td>
                    <td>{ele['info']}</td>
                    <td className='link'><img width="23px" src={ChoosePic} alt='choose'
                             onClick={() => this.chooseTeacher(ele['id'], ele['name'])}/></td>
                </tr>)
                tableData.push(tmp)
            })
            pages.push(
                <div key={0}
                     onClick={() => {
                         this.setState({page: 0, loading: true}, () => {
                             this.teacherTableData().then(() => {
                                 this.setState({loading: false})
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
                             this.setState({page: i - 1, loading: true}, () => {
                                 this.teacherTableData().then(() => {
                                     this.setState({loading: false})
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
                         this.setState({page: localStorage.getItem('totalPages') - 1, loading: true}, () => {
                             this.teacherTableData().then(() => {
                                 this.setState({loading: false})
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
                <th>编号</th>
                <th>姓名</th>
                <th>性别</th>
                <th>学号</th>
                <th>专业</th>
                <th>邮箱</th>
                <th>个人简介</th>
                <th></th>
                <th></th>
            </tr>)]
        })
    }

    componentDidMount() {
        this.teacherTableData()
    }

    render() {

        var mainView = <Table
            dataType={this.state.dataType}
            tableHead={this.state.tableHead}
            tableData={this.state.tableData}
            pages={this.state.pages}
            loading={this.state.loading}/>

        if (this.state.dataType === '个人信息修改') {

            mainView = <UpdatePersonalInfoView />
        } else if (this.state.dataType === '密码修改') {
            mainView = <ChangePasswordView/>
        }
        return (<div>
                <ToastContainer/>
                <Navigation showLogoutBtn={true} className='shadow'/>
                <div className="container-fluid">
                    <div className="row">
                        {/* 侧边栏 */}
                        <div className="col-md-2 left-bar">
                            <div className="mtem-2 plem-1">
                                <p className="gray plem-1 left-bar-title">
                                    <i className="fa fa-align-justify prem-1 mrem-1"></i>功能列表
                                </p>
                            </div>
                            <SideBar initIndex={5} changeTable={this.changeTable}/>
                            <br/>
                            <hr/>
                        </div>
                        <div className="col-md-10">
                            {/* 欢迎界面 */}
                            <WelcomeTitle/>
                            <hr/>
                            {/* 主界面 */}
                            {mainView}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default StudentHomePage
