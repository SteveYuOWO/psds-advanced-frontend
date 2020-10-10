import React, {Component} from 'react'
import Navigation from '../components/Navigation'
import StudentImg from '../assets/student.png'
import TeacherImg from '../assets/teacher.png'
import AdminImg from '../assets/admin.png'
import http from '../tools/http'
import Loading from '../components/Loading'

class Login extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            wrongmessage: '',
            loading: false
        }
        // document.body.css('background-color', 'rgb(255, 251, 244)')
    }

    changeUsername = (e) => {
        this.setState({
            username: e.target.value
        })
    }
    changePassword = (e) => {
        this.setState({
            password: e.target.value
        })
    }
    clickLogin = (e) => {
        if (this.state.username === '' || this.state.password === '') {
            this.setState({
                wrongmessage: '用户名和密码不能为空'
            })
        } else {
            this.setState({loading: true})
            http.post('/api/validate/login', {
                "loginType": this.props.loginType,
                "username": this.state.username,
                "password": this.state.password
            }).then(res => {
                if (res.data.message !== '登录成功') {
                    this.setState({
                        wrongmessage: res.data.message
                    })
                } else {
                    localStorage.setItem('username', res.data.data.user.name)
                    localStorage.setItem('loginType', this.props.loginType)
                    localStorage.setItem('user', JSON.stringify(res.data.data))
                    if (this.props.loginType === 'admin' && res.data.data.user.adminId === undefined) {
                        localStorage.setItem('loginType', 'root')
                    }

                    if (localStorage.getItem('loginType') === 'student') {
                        localStorage.setItem('loginTypeCN', '学生')
                        window.location.href = '#studenthomepage'
                    } else if (localStorage.getItem('loginType') === 'teacher') {
                        localStorage.setItem('loginTypeCN', '教师')
                        window.location.href = '#teacherhomepage'
                    } else if (localStorage.getItem('loginType') === 'admin') {
                        localStorage.setItem('loginTypeCN', '管理员')
                        window.location.href = '#adminshomepage'
                    } else {
                        localStorage.setItem('loginTypeCN', '超级管理员')
                        window.location.href = '#adminshomepage'
                    }
                }
                this.setState({loading: false})
            })
        }
    }
    checkToggle = (e) => {

    }

    render() {
        // 图标
        const loginType = this.props.loginType

        var userTypeImg = StudentImg

        if (loginType === 'teacher') userTypeImg = TeacherImg
        else if (loginType === 'admin') userTypeImg = AdminImg


        return (
            <div className='login-body'>
                <Navigation showLogoutBtn={false}/>

                <div style={{backgroundColor: 'rgb(255, 251, 244)'}}>
                    <div id="frame-container" className="bg-white shadow row">
                        <div className="col-md-6 bg-shadow full-height text-center">
                            <img src={userTypeImg} alt='userTypeImg' width="60%"
                                 className="inline vertical-center ptem-5"/>
                            <br/><br/>
                            <h4 className="gray">登录</h4>
                        </div>
                        <div className="col-md-6 full-height ptem-5 bg-white shadow">
                            <br/>
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <div className="input-group-text">
                                        <i className="fa fa-user"></i>
                                    </div>
                                </div>
                                <input type="text" name="username" className="form-control" placeholder="username"
                                       onChange={this.changeUsername}/>
                            </div>
                            <div>
                                <label id="wrong-msg" className="wrong-msg">&nbsp;</label>
                            </div>
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <div className="input-group-text">
                                        <i className="fa fa-lock"></i>
                                    </div>
                                </div>
                                <input type="password" name="password" className="form-control" placeholder="password"
                                       onChange={this.changePassword}/>
                            </div>
                            <div>
                                <label id="wrong-msg" className="wrong-msg">{this.state.wrongmessage}&nbsp;</label>
                            </div>
                            <div>
                                <input type="checkbox" name="remember" defaultChecked/>
                                <div className="inline gray font-sm" onChange={this.checkToggle}>记住密码</div>
                                <div className="inline gray font-sm float-right">忘记密码</div>
                            </div>
                            <br/>
                            <div className="container text-center btn-container">
                                <button type="submit"
                                        className="btn btn-default btn-sm border-gray-1 gray hover-dark-gray"
                                        onClick={this.clickLogin}>&nbsp;&nbsp;&nbsp;登录&nbsp;&nbsp;&nbsp;</button>
                            </div>
                        </div>
                    </div>
                </div>
                <Loading show={this.state.loading}/>
            </div>
        )
    }
}

export default Login
