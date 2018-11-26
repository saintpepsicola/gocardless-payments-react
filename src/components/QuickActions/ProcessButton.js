import React from 'react'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'

export default class ProcessButton extends React.Component {
    render() {
        return (
            <ProcessBtn color="primary" variant="extendedFab" aria-label="Process" >
                PROCESS
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