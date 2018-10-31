import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import styled from 'styled-components'
import Logo from '../Logo/Logo'
import headerBackground from '../../resources/header-bg.png'
import { Row, Col } from 'react-flexbox-grid'

export default class User extends Component {

    render() {
        return (
            <div>LETS GO</div>
            // <Header center="xs" middle="xs">
            //     <Col xs >
            //         User Account Info
            //     </Col>
            //     <Col xs >
            //         <Logo />
            //     </Col>
            // </Header>
        )
    }
}

// Proptypes


// Styled Components
const Header = styled(Row)`
  height:110px;
  min-width:1100px;
  width:100%;
  background-image:url(${headerBackground});
  background-repeat: repeat-x;
  background-size:contain;
`;