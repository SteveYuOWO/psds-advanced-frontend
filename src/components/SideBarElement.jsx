import React, {Component} from 'react'

export class SideBarElement extends Component {
    handleClick = () => {
        this.props.chooseTable(this.props.index)
    }

    render() {
        let notSelectElement = (
            <div className="mtem-1 option-menu rounded-pill ptpx-2">
                <p id="showTeachers"
                   className="gray plem-3 option-text">{this.props.icon}{this.props.data}{this.props.select}</p>
            </div>
        )

        let selectElement = (
            <div className="mtem-1 option-menu option-select rounded-pill ptpx-2">
                <p id="showStudents" className="white plem-3 option-text">{this.props.icon}{this.props.data}</p>
            </div>
        )

        if (this.props.selectIndex === this.props.index) {
            return (
                <div onClick={this.handleClick}>
                    {selectElement}
                </div>
            )
        } else {
            return (
                <div onClick={this.handleClick}>
                    {notSelectElement}
                </div>
            )
        }
    }
}

export default SideBarElement
