import React, {Component} from 'react'
import Navigation from '../components/Navigation'
import SideBar from '../components/SideBar'
import Table from '../components/Table'
import NavButtons from '../components/NavButtons'
import WelcomeTitle from '../components/WelcomeTitle'
import StudentApi from '../api/StudentApi'
import TeacherApi from '../api/TeacherApi'
import MajorApi from '../api/MajorApi'
import AdminApi from '../api/AdminApi'
import Pencil from '../assets/pencil.png'
import Delete from '../assets/delete.png'
import {confirmAlert} from 'react-confirm-alert'
import {ToastContainer, toast} from 'react-toastify';
import ChooseApi from '../api/ChooseApi'
import ChoosePic from '../assets/plus.png'
import UnChoosePic from '../assets/minus.png'

export class AdminsHomePage extends Component {
    constructor() {
        super()
        // Binding Functions
        this.changeTable = this.changeTable.bind(this)
        // States
        this.state = {
            tableDataType: "student",
            dataType: "学生信息",
            tableHead: "",
            tableData: "",
            pages: "",
            loading: false
        }
    }

    finalChoose = (chooseId) => {
        confirmAlert({
            title: '提示',
            message: `确定确认该志愿?`,
            buttons: [
                {
                    label: '是',
                    onClick: () => {
                        this.setState({loading: true}, () => {
                            ChooseApi.finalChoose(chooseId).then(res => {
                                toast.success(res.data)
                                this.chooseTableData()
                                this.setState({loading: false})
                            })
                        })
                    }
                },
                {
                    label: '否',
                    onClick: () => {}
                }
            ]
        });
    }

    /**
     * When we choose the index we need to determine
     * the data of the table
     *
     * @param {the choose of index} index
     */
    changeTable(index) {
        if (index === 0) {
            this.setState({
                dataType: '学生信息',
                loading: true
            }, () => {
                this.studentTableData().then(() => {
                    this.setState({loading: false})
                })
            })
        } else if (index === 1) {
            this.setState({
                dataType: '教师信息',
                loading: true
            }, () => {
                this.teacherTableData().then(() => {
                    this.setState({loading: false})
                })
            })
        } else if (index === 2) {
            this.setState({
                dataType: '管理员',
                loading: true
            }, () => {
                this.adminTableData().then(() => {
                    this.setState({loading: false})
                })
            })
        } else if (index === 3) {
            this.setState({
                dataType: '专业信息',
                loading: true
            }, () => {
                this.majorTableData().then(() => {
                    this.setState({loading: false})
                })
            })
        } else if (index === 4) {
            this.setState({
                dataType: '志愿管理',
                loading: true
            }, () => {
                this.chooseTableData().then(() => {
                    this.setState({loading: false})
                })
            })
        }
    }

    unFinalChoose = (chooseId) => {
        confirmAlert({
            title: '提示',
            message: `确定取消选择该志愿?`,
            buttons: [
                {
                    label: '是',
                    onClick: () => {
                        this.setState({loading: true}, () => {
                            ChooseApi.unFinalChoose(chooseId).then(res => {
                                toast.success('取消选择成功')
                                this.chooseTableData()
                                this.setState({loading: false})
                            })
                        })
                    }
                },
                {
                    label: '否',
                    onClick: () => {}
                }
            ]
        });
    }
    chooseTableData = async () => {
        var pages = [], tableData = []
        await ChooseApi.getChooseTableData(this.state.page, this.state.size).then((res) => {
            localStorage.setItem('totalPages', res.data.totalPages)
            res.data.content.forEach((ele, index) => {
                var statusData = '等待老师选择'
                if(ele['status'] === 1) {
                    statusData = <img width="23px" src={ChoosePic} alt='choose'
                        onClick={() => this.finalChoose(ele['id'])}/>
                }
                else if(ele['status'] === 2) {
                    statusData = <img width="23px" src={UnChoosePic} alt='unchoose'
                        onClick={() => this.unFinalChoose(ele['id'], ele['name'])}/>
                }
                
                var tmp = (<tr key={index}>
                    <td>{ele['id']}</td>
                    <td>{ele['student']['id']}</td>
                    <td>{ele['student']['name']}</td>
                    <td>{ele['teacher']['id']}</td>
                    <td>{ele['teacher']['name']}</td>
                    <td>{statusData}</td>
                </tr>)
                tableData.push(tmp)
            })
            pages.push(
                <div key={0}
                     onClick={() => {
                         this.setState({page: 0, loading: true}, () => {
                             this.chooseTableData().then(() => {
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
                                 this.chooseTableData().then(() => {
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
                             this.chooseTableData().then(() => {
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
                <th>教工号</th>
                <th>教师姓名</th>
                <th>学号</th>
                <th>学生姓名</th>
                <th>状态</th>
                <th></th>
            </tr>)]
        })
    }

    deleteMajor = (majorId, majorName) => {
        confirmAlert({
            title: '提示',
            message: `确定删除${majorName}?`,
            buttons: [
                {
                    label: '是',
                    onClick: () => {
                        this.setState({loading: true}, () => {
                            MajorApi.deleteMajorById(majorId).then((res) => {
                                this.majorTableData()
                                this.setState({loading: false})
                                toast.success(res)
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

    /**
     * major table data
     */
    majorTableData = async () => {
        var pages = [], tableData = []
        await MajorApi.getMajorTableData(this.state.page, this.state.size).then((res) => {
            localStorage.setItem('totalPages', res.data.totalPages)
            res.data.content.forEach((ele, index) => {
                var tmp = (<tr key={index}>
                    <td>{ele['id']}</td>
                    <td>{ele['name']}</td>
                    <td>{ele['info']}</td>
                    <td>{ele['max']}</td>
                    <td>
                        <img className="mrem-2" width="23px" src={Pencil} alt='update'/>
                        <img width="23px" src={Delete} alt='delete'
                             onClick={() => this.deleteMajor(ele['id'], ele['name'])}/>
                    </td>
                </tr>)
                tableData.push(tmp)
            })
            pages.push(
                <div key={0}
                     onClick={() => {
                         this.setState({page: 0, loading: true}, () => {
                             this.majorTableData().then(() => {
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
                                 this.majorTableData().then(() => {
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
                             this.majorTableData().then(() => {
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
                <th>专业名</th>
                <th>专业信息</th>
                <th>最大录取量</th>
                <th></th>
            </tr>)]
        })
    }

    deleteAdmin = (adminId, adminName) => {
        confirmAlert({
            title: '提示',
            message: `确定删除${adminName}?`,
            buttons: [
                {
                    label: '是',
                    onClick: () => {
                        this.setState({loading: true}, () => {
                            AdminApi.deleteAdminById(adminId).then((res) => {
                                this.adminTableData()
                                this.setState({loading: false})
                                toast.success(res)
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

    /**
     * admin table data
     */
    adminTableData = async () => {
        var pages = [], tableData = []
        await AdminApi.getAdminTableData(this.state.page, this.state.size).then((res) => {
            localStorage.setItem('totalPages', res.data.totalPages)
            res.data.content.forEach((ele, index) => {
                var tmp = (<tr key={index}>
                    <td>{ele['adminId']}</td>
                    <td>{ele['name']}</td>
                    <td>{ele['sex']}</td>
                    <td>
                        <img className="mrem-2" width="23px" src={Pencil} alt='update'/>
                        <img width="23px" src={Delete} alt='delete'
                             onClick={() => this.deleteAdmin(ele['adminId'], ele['name'])}/>
                    </td>
                </tr>)
                tableData.push(tmp)
            })
            pages.push(
                <div key={0}
                     onClick={() => {
                         this.setState({page: 0, loading: true}, () => {
                             this.adminTableData().then(() => {
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
                                 this.adminTableData().then(() => {
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
                             this.adminTableData().then(() => {
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
                <th></th>
                <th></th>
            </tr>)]
        })
    }

    /**
     * delete teacher by id
     * @param {teacherId}} teacherId
     * @param {teacherName} teacherName
     */
    deleteTeacher = (teacherId, teacherName) => {
        confirmAlert({
            title: '提示',
            message: `确定删除${teacherName}?`,
            buttons: [
                {
                    label: '是',
                    onClick: () => {
                        this.setState({loading: true}, () => {
                            TeacherApi.deleteTeacherById(teacherId).then((res) => {
                                this.teacherTableData()
                                this.setState({loading: false})
                                toast.success(res)
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

    /**
     * teacher table data
     */
    teacherTableData = async () => {
        var pages = [], tableData = []
        await TeacherApi.getTeacherTableData(this.state.page, this.state.size).then((res) => {
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
                    <td>
                        <img className="mrem-2" width="23px" src={Pencil} alt='update'/>
                        <img width="23px" src={Delete} alt='delete'
                             onClick={() => this.deleteTeacher(ele['id'], ele['name'])}/>
                    </td>
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

    /**
     * delete student by id
     * @param {studentId}} studentId
     * @param {studentName} studentName
     */
    deleteStudent = (studentId, studentName) => {
        confirmAlert({
            title: '提示',
            message: `确定删除${studentName}?`,
            buttons: [
                {
                    label: '是',
                    onClick: () => {
                        this.setState({loading: true}, () => {
                            StudentApi.deleteStudentById(studentId).then((res) => {
                                this.studentTableData()
                                this.setState({loading: false})
                                toast.success(res)
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

    /**
     * student table data
     */
    studentTableData = async () => {
        var pages = [], tableData = []
        await StudentApi.getStudentTableData(this.state.page, this.state.size).then((res) => {
            localStorage.setItem('totalPages', res.data.totalPages)
            res.data.content.forEach((ele, index) => {
                var tmp = (<tr key={index}>
                    <td>{ele['id']}</td>
                    <td>{ele['name']}</td>
                    <td>{ele['sex']}</td>
                    <td>{ele['stuNum']}</td>
                    <td>{ele['major']}</td>
                    <td>{ele['email']}</td>
                    <td>{ele['info']}</td>
                    <td>
                        <img className="mrem-2" width="23px" src={Pencil} alt='update'/>
                        <img width="23px" src={Delete} alt='delete'
                             onClick={() => this.deleteStudent(ele['id'], ele['name'])}/>
                    </td>
                </tr>)
                tableData.push(tmp)
            })
            pages.push(
                <div key={0}
                     onClick={() => {
                         this.setState({page: 0, loading: true}, () => {
                             this.studentTableData().then(() => {
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
                                 this.studentTableData().then(() => {
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
                             this.studentTableData().then(() => {
                                 this.setState({loading: false})
                             })
                         })
                     }}
                     className="btn-group mr-2" role="group" aria-label="First group">
                    <button type="button" className="btn-pagenum">尾页</button>
                </div>
            )
        })
        var tableHead = []
        tableHead.push((<tr key={0}>
            <th>编号</th>
            <th>姓名</th>
            <th>性别</th>
            <th>学号</th>
            <th>专业</th>
            <th>邮箱</th>
            <th>个人简介</th>
            <th></th>
        </tr>))
        this.setState({
            tableData: tableData,
            pages: pages,
            tableHead: tableHead
        })
    }

    componentDidMount() {
        this.studentTableData()
    }

    render() {
        var navButtons = <NavButtons setData={this.studentTableData} dataType={this.state.dataType}/>
        if (this.state.dataType === '学生信息') {
            navButtons = <NavButtons setData={this.studentTableData} dataType={this.state.dataType}/>
        } else if (this.state.dataType === '教师信息') {
            navButtons = <NavButtons setData={this.teacherTableData} dataType={this.state.dataType}/>
        } else if (this.state.dataType === '管理员') {
            navButtons = <NavButtons setData={this.adminTableData} dataType={this.state.dataType}/>
        }
        return (
            <div>
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
                            <SideBar initIndex={0} changeTable={this.changeTable}/>
                            <br/>
                            <hr/>
                        </div>
                        <div className="col-md-10">
                            {/* 欢迎界面 */}
                            <WelcomeTitle/>
                            <hr/>
                            {/* 按钮button */}
                            {navButtons}
                            {/* 表格 */}
                            <Table
                                dataType={this.state.dataType}
                                tableHead={this.state.tableHead}
                                tableData={this.state.tableData}
                                pages={this.state.pages}
                                loading={this.state.loading}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AdminsHomePage
