import React, {Component} from 'react'
import AdminApi from '../api/AdminApi'
import Loading from './Loading'

export class InsertOneAdminRecord extends Component {
    constructor() {
        super()
        this.state = {
            name: "",
            sex: "男",
            password: "",
            loading: false
        }
    }

    submitAdminRecord = () => {
        this.setState({loading: true}, () => {
            var admin = {
                name: this.state.name,
                sex: this.state.sex,
                password: this.state.password
            }
            AdminApi.insertOneAdmin(admin).then((res) => {
                alert(res.data)
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
    changeName = (e) => {
        this.setState({
            name: e.target.value
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
                                    密码
                                </div>
                            </div>
                            <input type="password" name="password" className="form-control" placeholder="password"
                                   onChange={this.changePassword}/>
                        </div>
                    </div>
                    <div className="row mbem-3">
                        <div className="col-md-6">
                            <button className="steve-sm-btn" type="submit" onClick={this.submitAdminRecord}>添加</button>
                        </div>
                        <div className="col-md-6">
                            <button className="steve-sm-btn" type="button" onClick={this.props.hidden}>取消</button>
                        </div>
                    </div>
                </div>
                <Loading show={this.state.loading}/>
            </div>
        )
    }
}

export default InsertOneAdminRecord
