import React from 'react'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import { withRouter } from "react-router"

class ProcessButton extends React.Component {

    handleClick() {
        if (window.confirm(`Are you sure you want to ${this.props.label} this order?`)) {
            this.props.updateGPStatus(this.props.repeat.repeat_id, this.props.label === 'Complete' ? 'accepted' : 'declined')
            this.props.history.push(`${process.env.PUBLIC_URL}/`)
            this.props.getRepeats(true)
        }
    }

    render() {
        return (
            <ProcessBtn label={this.props.label} onClick={this.handleClick.bind(this)} color="primary" variant="extendedFab" aria-label="Process" >
                {this.props.label}
            </ProcessBtn>
        )
    }
}

export default withRouter(ProcessButton)

const ProcessBtn = styled(Button)`
&&
{
    margin-top:16px;
    background-color: ${props => props.label === 'Reject order' ? '#939393' : '#509500'};
    font-size: 14px;
    font-weight: normal;
    color: #fff;
    height: 40px;
}  

`

const background = {
    'Complete': '#509500',
    'Reject Order': '#939393',
    'Process Later': '#2f84b0'
};