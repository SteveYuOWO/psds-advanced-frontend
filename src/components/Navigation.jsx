import React, {Component} from 'react'
import Logo from '../assets/logo-design.png'
import {Link} from 'react-router-dom'
import LogoutBtn from './LogoutBtn'

export class Navigation extends Component {
    render() {
        var showLogoutBtn = this.props.showLogoutBtn
        return (
            <div className='navigation-bar'>
                <div className="d-flex flex-column flex-md-row align-items-center p-4 px-md-5 mb-1 bg-white shadow">
                    <div className="my-0 mr-md-auto font-weight-normal logo">
                        <img src={Logo} width="400px" alt="研究生导师双选系统"/>
                    </div>
                    <nav className="my-2 my-md-1 mr-md-3">
                        <Link className="p-2 nav-text" to="#">导师信息</Link>
                        <Link className="p-2 nav-text" to="#">个人信息</Link>
                        <Link className="p-2 nav-text" to="#">学院概况</Link>
                        <Link className="p-2 nav-text" to="#">信息服务</Link>
                        <LogoutBtn show={showLogoutBtn}/>
                    </nav>
                </div>
            </div>
        )
    }
}

export default Navigation
