import React, {Component} from 'react'
import InsertOneStudentRecord from './InsertOneStudentRecord'
import InsertOneTeacherRecord from './InsertOneTeacherRecord'
import InsertOneAdminRecord from './InsertOneAdminRecord'
import UploadFrame from './UploadFrame'

export class NavButtons extends Component {
    constructor() {
        super()
        this.state = {
            show: 0
        }
    }

    showAddOneRecord = () => {
        this.setState({show: 1})
    }
    showUploadFrame = () => {
        this.setState((prev) => ({
            show: prev.show === 2 ? 0 : 2
        }))
    }
    hidden = () => {
        this.setState({show: 0})
    }

    render() {
        var addOneRecord = <InsertOneStudentRecord hidden={this.hidden} setData={this.props.setData}
                                                   dataType={this.props.dataType}/>
        var uploadFrame = <UploadFrame hidden={this.hidden} setData={this.props.setData}
                                       dataType={this.props.dataType}/>

        var buttons = [
            <button key={0} type="button" className="btn-steve" id="add-model-card-btn"
                    onClick={this.showAddOneRecord}>单条录入</button>,
            <button key={1} type="button" className="btn-steve" id="add-model-card-btn"
                    onClick={this.showUploadFrame}>批量导入</button>
        ]

        if (this.props.dataType === '学生信息') ;
        else if (this.props.dataType === '教师信息') {
            addOneRecord = <InsertOneTeacherRecord hidden={this.hidden} setData={this.props.setData}
                                                   dataType={this.props.dataType}/>
        } else if (this.props.dataType === '管理员') {
            buttons = [<button key={0} type="button" className="btn-steve" id="add-model-card-btn"
                               onClick={this.showAddOneRecord}>单条录入</button>]
            addOneRecord =
                <InsertOneAdminRecord hidden={this.hidden} setData={this.props.setData} dataType={this.props.dataType}/>
        } else {
            buttons = <p></p>
        }

        var moduleFrame = <p></p>
        if (this.state.show === 1) moduleFrame = addOneRecord
        else if (this.state.show === 2) moduleFrame = uploadFrame
        return (
            <div className="menu-group">
                {buttons}
                {moduleFrame}
            </div>
        )
    }
}

export default NavButtons
