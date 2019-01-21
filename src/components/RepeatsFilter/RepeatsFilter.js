import React, { Component } from 'react'
import styled from 'styled-components'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'

export default class RepeatsFilter extends Component {
    render() {
        return (
            <div>
                <Selector disableUnderline disabled value={0}>
                    <MenuItem value={0}>GP/Surgery</MenuItem>
                </Selector>
                <Selector disableUnderline value={0}>
                    <MenuItem value={0}>Donald Trump Trust Surgery</MenuItem>
                    <MenuItem value={1}>Red House Surgery</MenuItem>
                    <MenuItem value={2}>Milton Surgery</MenuItem>
                </Selector>
            </div>

        )
    }
}

const Selector = styled(Select)`
&& {
margin:12px 8px 0 0;
height: 44px;
border-radius: 13px;
box-shadow: 0 1px 2px 0 rgba(80, 80, 80, 0.2);
background-color: #ffffff;
font-size: 16px;
padding:0 12px;
color: #257195;
}
`