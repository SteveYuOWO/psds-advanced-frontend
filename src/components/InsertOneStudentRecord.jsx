import React, {Component} from 'react'
import StudentApi from '../api/StudentApi'
import Loading from './Loading'
import {ToastContainer, toast} from 'react-toastify';

export class InsertOneStudentRecord extends Component {
    constructor() {
        super()
        this.state = {
            stuNum: "",
            name: "",
            sex: "男",
            email: "",
            major: "",
            info: "",
            password: "",
            loading: false
        }
    }

    submitStudentRecord = () => {
        this.setState({loading: true}, () => {
            var student = {
                stuNum: this.state.stuNum,
                name: this.state.name,
                sex: this.state.sex,
                email: this.state.email,
                major: this.state.major,
                info: this.state.info,
                password: this.state.password
            }
            StudentApi.insertOneStudent(student).then((res) => {
                toast.success(res.data)
            }).then(() => {
                this.setState({loading: false})
                this.props.hidden()
                this.props.setData()
            })
        })
    }
    changeSex = (e) => {
        this.setState({
            sex: e.target.value === '1' ? '男' : '女'
        })
    }
    changeStuNum = (e) => {
        this.setState({
            stuNum: e.target.value
        })
    }
    changeName = (e) => {
        this.setState({
            name: e.target.value
        })
    }
    changeEmail = (e) => {
        this.setState({
            email: e.target.value
        })
    }
    changeMajor = (e) => {
        this.setState({
            major: e.target.value
        })
    }
    changeInformation = (e) => {
        this.setState({
            info: e.target.value
        })
    }
    changePassword = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    render() {
        return (
            <div>
                <div className="model-card shadow" id="add-model-card">
                    <div className="model-card-container">
                        <div>
                            单条录入
                        </div>
                        <hr/>
                        <div className="input-group mb-2">
                            <div className="input-group-prepend">
                                <div className="input-group-text">
                                    学号
                                </div>
                            </div>
                            <input type="text" name="stuNum" className="form-control" placeholder="stuNum"
                                   onChange={this.changeStuNum}/>
                        </div>
                        <div className="input-group mb-2">
                            <div className="input-group-prepend">
                                <div className="input-group-text">
                                    姓名
                                </div>
                            </div>
                            <input type="text" name="name" className="form-control" placeholder="name"
                                   onChange={this.changeName}/>
                        </div>
                        <div className="mtem-1 mbem-1 row">
                            <div className="col-md-6"><input type="radio" name="sex" value="1" defaultChecked
                                                             onChange={this.changeSex}/> 男
                            </div>
                            <div className="col-md-6"><input type="radio" name="sex" value="0"
                                                             onChange={this.changeSex}/> 女
                            </div>
                        </div>
                        <div className="input-group mb-2">
                            <div className="input-group-prepend">
                                <div className="input-group-text">
                                    邮箱
                                </div>
                            </div>
                            <input type="text" name="email" className="form-control" placeholder="email"
                                   onChange={this.changeEmail}/>
                        </div>
                        <div className="input-group mb-2">
                            <div className="input-group-prepend">
                                <div className="input-group-text">
                                    专业
                                </div>
                            </div>
                            <input type="text" name="major" className="form-control" placeholder="major"
                                   onChange={this.changeMajor}/>
                        </div>
                        <div className="input-group mb-2">
                            <div className="input-group-prepend">
                                <div className="input-group-text">
                                    信息
                                </div>
                            </div>
                            <textarea name="information" className="form-control" placeholder="information"
                                      onChange={this.changeInformation}></textarea>
                        </div>
                        <div className="input-group mb-2">
                            <div className="input-group-prepend">
                                <div className="input-group-text">
                                    密码
                                </div>
                            </div>
                            <input type="password" name="password" className="form-control" placeholder="password"
                                   onChange={this.changePassword}/>
                        </div>
                    </div>
                    <div className="row mbem-3">
                        <div className="col-md-6">
                            <button className="steve-sm-btn" type="submit" onClick={this.submitStudentRecord}>添加
                            </button>
                        </div>
                        <div className="col-md-6">
                            <button className="steve-sm-btn" type="button" onClick={this.props.hidden}>取消</button>
                        </div>
                    </div>
                </div>
                <Loading show={this.state.loading}/>
                <ToastContainer/>
            </div>
        )
    }
}

export default InsertOneStudentRecord
