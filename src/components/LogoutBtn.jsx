import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export class LogoutBtn extends Component {
    render() {
        if (this.props.show) {
            return <Link className="p-2 nav-text logout-text" to='/'>注销</Link>
        } else {
            return <div></div>
        }
    }
}

export default LogoutBtn
