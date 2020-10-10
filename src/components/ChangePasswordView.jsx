import React, {Component} from 'react'
import {toast} from 'react-toastify';
import ChangePasswordApi from '../api/ChangePasswordApi'
import Loading from './Loading'

export class ChangePasswordView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            oldPassword: "",
            newPassword: "",
            repeatNewPassword: "",
            loading: false
        }
    }

    changeOldPassword = (e) => {
        this.setState({oldPassword: e.target.value})
    }
    changeNewPassword = (e) => {
        this.setState({newPassword: e.target.value})
    }
    repeatNewPassword = (e) => {
        this.setState({repeatNewPassword: e.target.value})
    }
    submitChangePassword = (e) => {
        if (this.state.oldPassword === '' || this.state.newPassword === '' || this.state.repeatNewPassword === '')
            toast.success('输入不能为空');
        else if (this.state.newPassword !== this.state.repeatNewPassword)
            toast.success('两次密码输入不一致')
        else {
            let type = localStorage.getItem('loginType')
            let userId = JSON.parse(localStorage.getItem('user')).user.id
            this.setState({
                loading: true
            }, () => {
                ChangePasswordApi.changePassword(userId, this.state.oldPassword, this.state.newPassword, type).then(res => {
                    this.setState({
                        loading: false
                    })
                    toast.success(res.data)
                })
            })
        }
    }

    render() {
        return (
            <div>
                <div className="model-card-container">
                    <input type="hidden" id="stuid" name="id"/>
                    <div>
                        <h2 className="dark-gray" style={{textAlign: 'center'}}>密码修改</h2>
                    </div>
                    <hr/>
                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                            <div className="input-group-text">
                                旧密码
                            </div>
                        </div>
                        <input name="oldPassword" type="password" className="form-control" placeholder="请输入旧密码"
                               onChange={this.changeOldPassword}/>
                    </div>
                    <br/>
                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                            <div className="input-group-text">
                                新密码
                            </div>
                        </div>
                        <input name="newPassword" type="password" className="form-control" placeholder="请输入新密码"
                               onChange={this.changeNewPassword}/>
                    </div>
                    <br/>
                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                            <div className="input-group-text">
                                新密码
                            </div>
                        </div>
                        <input name="repeatPassword" type="password" className="form-control" placeholder="请再次输入新密码" 
                               onChange={this.repeatNewPassword}/>
                    </div>
                    <br/>
                    <div className="mr-2">
                        <button type="submit" className="btn-pagenum btn-full-width dark-gray shadow-sm align-center"
                                onClick={this.submitChangePassword}>
                            修改
                        </button>
                    </div>
                </div>
                <Loading show={this.state.loading}/>
            </div>
        )
    }
}

export default ChangePasswordView
