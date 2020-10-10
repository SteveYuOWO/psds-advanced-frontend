import React, {Component} from 'react'
import Loading from './Loading'

export class Table extends Component {
    constructor() {
        super()
        this.state = {
            "page": 0,
            "size": 10
        }
    }

    render() {
        // loading state
        return (
            <div className="mtem-5">
                <div className="minbox text-center plem-1 prem-1"><i
                    className="fa fa-file-text-o prem-1 mrem-1"></i>{this.props.dataType}</div>
                <table className="table text-center">
                    <thead>{this.props.tableHead.length > 0 ? this.props.tableHead : <tr></tr>}</thead>
                    <tbody>{this.props.tableData.length > 0 ? this.props.tableData : <tr></tr>}</tbody>
                </table>
                <div className="btn-toolbar float-right mtem-3" role="toolbar" aria-label="Toolbar with button groups">
                    {this.props.pages}
                </div>
                <Loading show={this.props.loading}/>
            </div>
        )
    }
}

export default Table
