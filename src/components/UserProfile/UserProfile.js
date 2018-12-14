import React, { Component } from 'react'
import styled from 'styled-components'
import { Flex, Box } from 'reflexbox'

export default class UserProfile extends Component {

    render() {
        return (
            <Container>
                <SideBar w={364}>
                    <Username>{this.props.userName}</Username>
                    <Action>Profile</Action>
                    <Action>Team Members</Action>

                    <Links>
                        <Link>Legal</Link>
                        <Link>Terms & Conditions</Link>
                        <Link>Logout</Link>
                    </Links>
                </SideBar>
                <Content auto>
                    <Header>Profile</Header>
                    <Subheader>Personal Information</Subheader>

                    <Info><span>Name:</span>{this.props.userName}</Info>
                    <Info><span>Birthdate:</span>12/11/1984</Info>

                    <Subheader border>Account information</Subheader>

                    <Info><span>Email Address:</span>john.appleseed@mail.com</Info>
                    <Info><span>Password:</span>●●●●●●●●●</Info>
                </Content>
            </Container>
        )
    }
}

// Styled Components
const Container = styled(Flex)`
 &&
 {
    min-height:calc(100vh - 110px);
 }
`

const Content = styled(Box)`
 &&
 {
    font-size: 13px;
    color: #ffffff;
    line-height:59px;
    background:#fff;
    margin:0;
    padding:0 24px;
 }
`

const SideBar = styled(Box)`
 &&
 {
    font-size: 13px;
    color: #ffffff;
    line-height:59px;
    background:#257397;
    margin:0;
    padding:0 24px;
    position:relative;
 }
`

const Header = styled.p`
 &&
 {
    font-size: 22px;
    font-weight: 800;
    color: #257397;
    text-transform:uppercase;
    border-bottom:1px solid #efefef;
    padding-bottom: 12px;
 }
`

const Subheader = styled.p`
 &&
 {
  font-size: 18px;
  font-weight: 800;
  color: #282828;
  text-transform:uppercase;
  border-top:${props => props.border ? '1px solid #efefef' : 'none'};
 }
`

const Info = styled.p`
 &&
 {
    font-size: 16px;
    color: #282828;
 }

 && span
 {
    font-weight: bold;
    display:inline-block;
    width:200px;
 }
`

const Username = styled.p`
    &&
    {
        font-size: 18px;
        font-weight: 600;
        color: #ffffff;
        line-height:149px;
        border-bottom:1px solid #6b94bb;
    }
`

const Action = styled.p`
&&
{
    font-size:18px;
    font-weight:600;
    color: #ffffff;
    cursor:pointer;
    line-height: 1.3;
}
`

const Links = styled.div`
    &&
    {
        position: absolute;
        bottom: 0;
    }
`

const Link = styled.p`
    &&
    {
        font-size: 16px;
        font-weight: 300;
        color: #8ab6cb;
        line-height:1.4;
    }
`

