import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import styled from 'styled-components'
import Logo from '../Logo/Logo'
import UserAvatar from '../UserAvatar/UserAvatar'
import headerBackground from '../../resources/header-bg.png'
import { Row, Col } from 'react-flexbox-grid'

export default class AppBar extends Component {

    render() {
        return (
            <Header center="xs">
                <Container middle="xs" >
                    <Col xs start='xs'>
                        <UserAvatar />
                    </Col>
                    <Col xs >
                        <Logo />
                    </Col>
                </Container>
            </Header >
        )
    }
}

// Proptypes


// Styled Components
const Header = styled(Row)`
  height:110px;
  width:100%;
  background-image:url(${headerBackground});
  background-repeat: repeat-x;
  background-size:contain;
`;

const Container = styled(Row)`
  width:1100px;
`;