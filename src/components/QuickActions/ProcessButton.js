import React from 'react'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import { withRouter } from "react-router"
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog'

class ProcessButton extends React.Component {

    state = { showConfirmModal: false }

    async handleClick() {
        let { repeat: { repeat_id }, medicines } = this.props
        let fullyRejected = medicines.filter(remedy => remedy.approved).length === 0 ? true : false
        switch (this.props.label) {
            case 'Process':
                await this.props.updateGPStatus(repeat_id, fullyRejected ? 'declined' : 'accepted', medicines)
                this.showActiveTab()
                break
            case 'Approve':
                await this.props.updateGPStatus(repeat_id, 'accepted', medicines)
                this.showActiveTab()
                break
            case 'Reject':
                this.setState({ showConfirmModal: true })
                // await this.props.updateGPStatus(repeat_id, 'declined', medicines)
                break
            case 'Complete':
                await this.props.updateGPStatus(repeat_id, fullyRejected ? 'declined' : 'accepted', medicines)
                this.showActiveTab()
                break
            default:
                break
        }
    }

    showActiveTab() {
        this.props.history.push(`${process.env.PUBLIC_URL}/`)
        setTimeout(() => this.props.getRepeats(true), 100)
    }

    handleConfirm(reason) {
        let { repeat: { repeat_id }, medicines } = this.props
        this.props.updateGPStatus(repeat_id, 'declined', medicines, reason)
        this.setState({ showConfirmModal: false })
        this.showActiveTab()
    }

    handleClose() {
        this.setState({ showConfirmModal: false })
    }

    render() {
        return (
            <div>
                <ConfirmDialog
                    open={this.state.showConfirmModal}
                    handleClose={this.handleClose.bind(this)}
                    handleConfirm={this.handleConfirm.bind(this)}
                    aria-labelledby="form-dialog-title"
                    title='You are about to reject the entire order'
                    contentText='Please leave a note to the patient about your decision'
                    {...this.props}
                />
                <ProcessBtn disabled={this.props.disabled} label={this.props.label} onClick={this.handleClick.bind(this)} color="primary" variant="contained" aria-label="Process" >
                    {this.props.label}
                </ProcessBtn>
            </div>
        )
    }
}

export default withRouter(ProcessButton)

const ProcessBtn = styled(Button)`
&&
{
margin-top:16px;
margin-left:16px;
width:100px;
font-family: Assistant;
border-radius:24px;
background-color: ${props => buttonColor[props.label]};
font-size: 14px;
font-weight: 600;
color: #fff;
height: 34px;
padding: 0;
box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.28);
:hover {
background-color: ${props => buttonColor[props.label]};
opacity: 0.9;
}
}
`

const buttonColor = {
    'Reject': '#939393',
    'Process': '#419646',
    'Approve': '#419646',
    'Complete': '#419646'
}