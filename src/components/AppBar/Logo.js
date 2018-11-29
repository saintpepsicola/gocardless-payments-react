import React, { Component } from 'react'
import logo from '../../resources/logo-white.png'
import styled from 'styled-components'

export default class Logo extends Component {

    render() {
        return (
            <LogoImg src={logo} align="right" alt='Healthera Logo' />
        )
    }
}

const LogoImg = styled.img`
width: 196px;
height: 29px;
`

