import React, {Component} from 'react'
import SideBarElement from './SideBarElement';

/**
 * 侧边栏
 */
export class SideBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            bar: "",
            selectIndex: this.props.initIndex
        }
    }

    chooseTable = (index) => {
        // 子组件的select选择值
        this.setState({
            selectIndex: index
        })
        // changeTable
        this.props.changeTable(index)
    }

    render() {
        let studentManageIcon = <i className="fa fa-users prem-1 mrem-1"></i>
        let teacherManageIcon = <i className="fa fa-user mrem-1"></i>
        let managerManageIcon = <i className="fa fa-expeditedssl prem-1 mrem-1"></i>
        let majorManageIcon = <i className="fa fa-book prem-1 mrem-1"></i>
        let chooseManageIcon = <i className="fa fa-building-o prem-1 mrem-1"></i>
        let seethechooseIcon = <i className="fa fa-check-square-o prem-1 mrem-1"></i>
        let personalInfoIcon = <i className="fa fa-book prem-1 mrem-1"></i>
        let changePasswordIcon = <i className="fa fa fa-asterisk prem-1 mrem-1"></i>
        let morePeopleIcon = <i className="fa fa-users prem-1 mrem-1"></i>
        // let loginLogIcon = <i className="fa fa-files-o prem-1 mrem-1"></i>

        var sideBarElements = []
        if (localStorage.getItem('loginType') === 'admin' || localStorage.getItem('loginType') === 'root') {
            sideBarElements.push(<SideBarElement key={0} index={0} data="学生管理" selectIndex={this.state.selectIndex}
                                                 icon={studentManageIcon} chooseTable={this.chooseTable}/>)
            sideBarElements.push(<SideBarElement key={1} index={1} data="教师管理" selectIndex={this.state.selectIndex}
                                                 icon={teacherManageIcon} chooseTable={this.chooseTable}/>)
            if (localStorage.getItem('loginType') === 'root') sideBarElements.push(<SideBarElement key={2} index={2}
                                                                                                   data="学院管理员管理"
                                                                                                   selectIndex={this.state.selectIndex}
                                                                                                   icon={managerManageIcon}
                                                                                                   chooseTable={this.chooseTable}/>)
            sideBarElements.push(<SideBarElement key={3} index={3} data="专业管理" selectIndex={this.state.selectIndex}
                                                 icon={majorManageIcon} chooseTable={this.chooseTable}/>)
            sideBarElements.push(<SideBarElement key={4} index={4} data="志愿管理" selectIndex={this.state.selectIndex}
                                                 icon={chooseManageIcon} chooseTable={this.chooseTable}/>)
        } else if (localStorage.getItem('loginType') === 'student') {
            sideBarElements.push(<SideBarElement key={5} index={5} data="导师选择" selectIndex={this.state.selectIndex}
                                                 icon={teacherManageIcon} chooseTable={this.chooseTable}/>)
            sideBarElements.push(<SideBarElement key={6} index={6} data="志愿查看" selectIndex={this.state.selectIndex}
                                                 icon={seethechooseIcon} chooseTable={this.chooseTable}/>)
            sideBarElements.push(<SideBarElement key={7} index={7} data="个人信息修改" selectIndex={this.state.selectIndex}
                                                 icon={personalInfoIcon} chooseTable={this.chooseTable}/>)
            sideBarElements.push(<SideBarElement key={8} index={8} data="密码修改" selectIndex={this.state.selectIndex}
                                                 icon={changePasswordIcon} chooseTable={this.chooseTable}/>)
        } else {
            // teacher
            sideBarElements.push(<SideBarElement key={9} index={9} data="被选名单" selectIndex={this.state.selectIndex}
                                                 icon={morePeopleIcon} chooseTable={this.chooseTable}/>)
            sideBarElements.push(<SideBarElement key={10} index={10} data="个人信息修改" selectIndex={this.state.selectIndex}
                                                 icon={personalInfoIcon} chooseTable={this.chooseTable}/>)
            sideBarElements.push(<SideBarElement key={11} index={11} data="密码修改" selectIndex={this.state.selectIndex}
                                                 icon={changePasswordIcon} chooseTable={this.chooseTable}/>)
        }
        return (<div>
            {sideBarElements}
        </div>)
    }
}

export default SideBar
