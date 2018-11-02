import React, { Component } from 'react'
import logo from '../../resources/logo-white.png'
import styled from 'styled-components'

export default class Logo extends Component{

    render() {
        return (
            <HealtheraLogo src={logo} alt='Healthera Logo' />
        )
    }
}

// Styled Components
const HealtheraLogo = styled.img`
  text-align:right;
`;