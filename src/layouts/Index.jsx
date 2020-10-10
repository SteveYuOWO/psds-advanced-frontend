import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import StudentImg from '../assets/student.png'
import TeacherImg from '../assets/teacher.png'
import AdminImg from '../assets/admin.png'
import Navigation from '../components/Navigation'

class Index extends Component {
    render() {
        return (
            <div>
                <Navigation showLogoutBtn={false}/>
                <div className="px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center" style={{marginTop: -3}} id="title-bar">
                    <h1 id="title">研究生导师双选系统</h1>
                </div>
                <div className="container" id="card-container">
                    <div className="card-deck mb-3 text-center">
                        <div className="card mb-4 shadow-sm">
                            <div className="card-header">
                                <h4 className="my-0 font-weight-normal">学生</h4>
                            </div>
                            <div className="card-body">
                                <Link to="loginStudent">
                                    <img src={StudentImg} alt="student" width="99%"/>
                                </Link>
                            </div>
                        </div>
                        <div className="card mb-4 shadow-sm">
                            <div className="card-header">
                                <h4 className="my-0 font-weight-normal">教师</h4>
                            </div>
                            <div className="card-body">
                                <Link to="loginTeacher">
                                    <img src={TeacherImg} alt="teacher" width="99%"/>
                                </Link>
                            </div>
                        </div>
                        <div className="card mb-4 shadow-sm login-btn">
                            <div className="card-header">
                                <h4 className="my-0 font-weight-normal">管理员</h4>
                            </div>
                            <div className="card-body">
                                <Link to="loginAdmin">
                                    <img src={AdminImg} alt="admin" width="99%"/>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Index
