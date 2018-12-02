import React from 'react'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import { withRouter } from "react-router"

class ProcessButton extends React.Component {

    handleClick() {
        if (this.props.label === 'Process later') {
            this.props.history.push(`${process.env.PUBLIC_URL}/`)
            this.props.getRepeats(true)
        } else {
            if (window.confirm(`Are you sure you want to ${this.props.label} this order?`)) {
                this.props.updateGPStatus(this.props.repeat.repeat_id, this.props.label === 'Complete' ? 'accepted' : 'declined')
                this.props.history.push(`${process.env.PUBLIC_URL}/`)
                this.props.getRepeats(true)
            }
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
    background-color: ${props => buttonColor[props.label]};
    font-size: 14px;
    font-weight: normal;
    color: #fff;
    height: 40px;
}
`

const buttonColor = {
    'Reject order': '#939393',
    'Process later': '#2f84b0',
    'Complete': '#509500'
}