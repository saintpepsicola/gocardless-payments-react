import React from 'react'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import { withRouter } from "react-router"
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog'

class ProcessButton extends React.Component {

    state = {
        showConfirmModal: false
    }

    handleClick() {
        if (this.props.label === 'Process later') {
            this.props.history.push(`${process.env.PUBLIC_URL}/`)
            this.props.getRepeats(true)
        }
        else if (this.props.label === 'Reject') {
            this.setState({ showConfirmModal: true })
        }
        else if (window.confirm(`Are you sure you want to ${this.props.label} this order?`)) {
            this.props.updateGPStatus(this.props.repeat.repeat_id, this.props.label === 'Approve' || this.props.label === 'Complete' ? 'accepted' : 'declined')
                .then(() => {
                    this.props.history.push(`${process.env.PUBLIC_URL}/`)
                    this.props.getRepeats(true)
                })
        }
    }

    handleConfirm() {
        const { repeat } = this.props
        this.props.updateGPStatus(repeat.repeat_id, this.props.label === 'Approve' ? 'accepted' : 'declined')
        this.props.history.push(`${process.env.PUBLIC_URL}/`)
        this.props.getRepeats(true)
        this.setState({
            showConfirmModal: false
        })
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
    'Process later': '#2f84b0',
    'Approve': '#419646',
    'Complete': '#419646'
}