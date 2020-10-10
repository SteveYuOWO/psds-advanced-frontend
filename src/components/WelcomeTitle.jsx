import React, {Component} from 'react'

export class WelcomeTitle extends Component {
    render() {
        return (
            <div className="ptem-2 plem-2 main-content dark-gray">
                <p className="right-title">欢迎 {localStorage.getItem('loginTypeCN')} {localStorage.getItem('username')} 登陆研究生导师双选平台</p>
            </div>
        )
    }
}

export default WelcomeTitle
