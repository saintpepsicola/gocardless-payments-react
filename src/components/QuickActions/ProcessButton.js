import React from 'react'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'

export default class ProcessButton extends React.Component {


    handleClick() {
        this.props.updateGPStatus(this.props.repeat.repeat_id, 'accepted')
    }

    render() {
        console.log(this.props)
        return (
            <ProcessBtn onClick={this.handleClick.bind(this)} color="primary" variant="extendedFab" aria-label="Process" >
                COMPLETE
           </ProcessBtn>
        )
    }
}

const ProcessBtn = styled(Button)`
&&
{
    margin-top:16px;
    background-color:#0D6F67;
    font-size: 14px;
    font-weight: normal;
    color: #fff;
    height: 40px;
}  

`