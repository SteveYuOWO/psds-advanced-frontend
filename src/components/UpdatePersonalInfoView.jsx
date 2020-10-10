import React, { Component } from 'react'
import { toast } from 'react-toastify';
import StudentApi from '../api/StudentApi';
import TeacherApi from '../api/TeacherApi';
import Loading from './Loading'

export class UpdatePersonalInfoView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: JSON.parse(localStorage.getItem('user')).user.email,
            info: JSON.parse(localStorage.getItem('user')).user.info
        }
    }
    changeEmail = (e) => {
        this.setState({ email: e.target.value })
    }
    changeInfo = (e) => {
        this.setState({ info: e.target.value })
    }
    submitInfo = () => {
        let user = JSON.parse(localStorage.getItem('user'))
        user.user.email = this.state.email
        user.user.info = this.state.info
        localStorage.setItem('user', JSON.stringify(user))
        if(localStorage.getItem('loginType') === 'student') {
            StudentApi.updateStudent(JSON.stringify(user.user)).then((res) => {
                toast.success(res.data)
            })
        } else if(localStorage.getItem('loginType') === 'teacher') {
            TeacherApi.updateTeacher(JSON.stringify(user.user)).then((res) => {
                toast.success(res.data)
            })
        }
        
    }
    render() {
        let user = JSON.parse(localStorage.getItem('user')).user
        var frame = (<div>
            <div className="model-card-container">
                <input type="hidden" id="stuid" name="id" />
                <div>
                    <h2 className="dark-gray" style={{ textAlign: 'center' }}>个人信息修改</h2>
                </div>
                <hr />


                <div className="input-group mb-2">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            工号
                        </div>
                    </div>
                    <input type="text" disabled className="form-control" placeholder="student number" value={user.teaNum} />
                </div>
                <br />
                <div className="input-group mb-2">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            姓名
                        </div>
                    </div>
                    <input type="text" disabled className="form-control" placeholder="name" value={user.name} />
                </div>
                <br />
                <div className="input-group mb-2">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            性别
                        </div>
                    </div>
                    <input type="text" disabled className="form-control" placeholder="sex" value={user.sex} />
                </div>
                <br />
                <div className="input-group mb-2">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            邮箱
                        </div>
                    </div>
                    <input id="email" type="text" name="email"
                        className="form-control" placeholder="email" defaultValue={user.email}
                        onChange={this.changeEmail} />
                </div>
                <br />
                <div className="input-group mb-2">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            专业
                        </div>
                    </div>
                    <input id="majors" readOnly type="text" name="major" className="form-control" value={user.major} />
                </div>
                <br />
                <div className="input-group mb-2">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            信息
                        </div>
                    </div>
                    <textarea id="infoas" rows="5" name="info" className="form-control"
                        placeholder="information" defaultValue={user.info}
                        onChange={this.changeInfo}></textarea>
                </div>
                <br />
                <div className="mr-2">
                    <button type="submit" className="btn-pagenum btn-full-width dark-gray shadow-sm align-center"
                        onClick={this.submitInfo}>
                        修改
                    </button>
                </div>
            </div>
        </div>)

        if (localStorage.getItem('loginType') === 'student') {
            frame = (<div>
                <div className="model-card-container">
                    <input type="hidden" id="stuid" name="id" />
                    <div>
                        <h2 className="dark-gray" style={{ textAlign: 'center' }}>个人信息修改</h2>
                    </div>
                    <hr />


                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                            <div className="input-group-text">
                                学号
                        </div>
                        </div>
                        <input type="text" disabled className="form-control" placeholder="student number" value={user.stuNum} />
                    </div>
                    <br />
                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                            <div className="input-group-text">
                                姓名
                        </div>
                        </div>
                        <input type="text" disabled className="form-control" placeholder="name" value={user.name} />
                    </div>
                    <br />
                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                            <div className="input-group-text">
                                性别
                        </div>
                        </div>
                        <input type="text" disabled className="form-control" placeholder="sex" value={user.sex} />
                    </div>
                    <br />
                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                            <div className="input-group-text">
                                邮箱
                        </div>
                        </div>
                        <input id="email" type="text" name="email"
                            className="form-control" placeholder="email" defaultValue={user.email}
                            onChange={this.changeEmail} />
                    </div>
                    <br />
                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                            <div className="input-group-text">
                                专业
                        </div>
                        </div>
                        <input id="majors" readOnly type="text" name="major" className="form-control" value={user.major} />
                    </div>
                    <br />
                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                            <div className="input-group-text">
                                信息
                        </div>
                        </div>
                        <textarea id="infoas" rows="5" name="info" className="form-control"
                            placeholder="information" defaultValue={user.info}
                            onChange={this.changeInfo}></textarea>
                    </div>
                    <br />
                    <div className="mr-2">
                        <button type="submit" className="btn-pagenum btn-full-width dark-gray shadow-sm align-center"
                            onClick={this.submitInfo}>
                            修改
                    </button>
                    </div>
                </div>
            </div>)
        }
        return <div>{frame}</div>
    }
}

export default UpdatePersonalInfoView
