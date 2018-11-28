import React from 'react'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import { withRouter } from "react-router"

class ProcessButton extends React.Component {

    handleClick() {
        this.props.updateGPStatus(this.props.repeat.repeat_id, this.props.label === 'Complete' ? 'accepted' : 'declined')
        this.props.history.push(`${process.env.PUBLIC_URL}/`)
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
    background-color:  ${props => props.label === 'Cancel' ? '#939393' : '#0D6F67'};
    font-size: 14px;
    font-weight: normal;
    color: #fff;
    height: 40px;
}  

`