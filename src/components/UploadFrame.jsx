import React, {Component} from 'react'
import StudentApi from '../api/StudentApi'
import TeacherApi from '../api/TeacherApi'
import UploadPic from '../assets/upload-pic.png'
import Loading from './Loading'
import {ToastContainer, toast} from 'react-toastify';

export class UploadFrame extends Component {
    constructor() {
        super()
        this.state = {loading: false}
    }

    handleClick = () => {
        document.getElementById('upload-img-inputfile').click()
    }
    handleChange = (e) => {
        // upload the file
        var file = e.target.files[0]
        this.setState({loading: true}, () => {
            if (this.props.dataType === '学生信息') {
                StudentApi.uploadStudentXML(file).then((res) => {
                    toast.success(res)
                    this.props.setData()
                    this.props.hidden()
                }).then(() => {
                    this.setState({loading: false})
                })
            } else if (this.props.dataType === '教师信息') {
                TeacherApi.uploadTeacherXML(file).then((res) => {
                    toast.success(res)
                    this.props.setData()
                    this.props.hidden()
                }).then(() => {
                    this.setState({loading: false})
                })
            }
        })
    }

    render() {
        if (this.state.loading) return <Loading show={this.state.loading}/>
        else return (
            <div onClick={this.handleClick}>
                <div className="model-card shadow" id="upload-model-card">
                    <div className="model-card-container">
                        <div>
                            批量导入
                        </div>
                        <hr/>
                        <div>
                            <img id="upload-img" alt="upload" className="upload-img" src={UploadPic} width="40%"/>
                        </div>
                    </div>
                    <form action="insertBatchTeachers" encType="multipart/form-data" method="post">
                        <input id="upload-img-inputfile" name="studentFile" type="file" style={{display: "none"}}
                               onChange={this.handleChange}/>
                        <button id="upload-img-inputfile-btn" type="submit" className="hidden"></button>
                    </form>
                </div>
                <ToastContainer/>
            </div>
        )
    }
}

export default UploadFrame
