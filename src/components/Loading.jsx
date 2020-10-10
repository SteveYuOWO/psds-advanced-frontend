import React, {Component} from 'react'
import LoadingImg from '../assets/loading-spin.svg'
import '../css/loading.css'

export class Loading extends Component {
    render() {
        if (this.props.show)
            return (
                <div className="loading">
                    <img src={LoadingImg} alt="Loading" width="100%" height="100%"/>
                </div>
            )
        else return (<p></p>)
    }
}

export default Loading
