import React, { Component } from 'react'
import styled from 'styled-components'
import Drawer from '@material-ui/core/Drawer'

export default class UserProfile extends Component {

    state = { open: false }

    componentWillReceiveProps() {
        this.setState({ open: this.props.open })
    }

    toggleDrawer() {
        this.setState({ open: false })
    }

    render() {
        return (
            <Profile variant='temporary' open={this.state.open} onClose={this.toggleDrawer.bind(this)}>
                <div id="content">
                    <Podname>{this.props.podName}</Podname>
                    <Username>{this.props.userName}</Username>

                    <Action>Profile</Action>
                    <Action>Team Members</Action>
                    <Action>Settings</Action>

                    <Links>
                        <Link>Legal</Link>
                        <Link>Terms & Conditions</Link>
                        <Link>Logout</Link>
                    </Links>
                </div>
            </Profile>
        )
    }
}

// Styled Components
const Profile = styled(Drawer)`
 && > div #content
 {
     height:100%;
     width:454px;
     position:relative;
 }
`

const Podname = styled.p`
 &&
 {
    font-size: 13px;
    color: #ffffff;
    line-height:59px;
    background:#336da6;
    margin:0;
    padding:0 24px;
 }
`

const Username = styled.p`
 &&
 {
    font-size: 18px;
    color: #ffffff;
    line-height:152px;
    background:#336da6;
    margin:0;
    padding:0 24px;
 }
`

const Action = styled.p`
 &&
 {
    font-size: 18px;
    color: #666666;
    line-height:40px;
    margin:0;
    padding:0 24px;
    font-weight:bold;
 }
`

const Links = styled.div`
 &&
 {
    position:absolute;
    bottom:0;
 }
`

const Link = styled.p`
 &&
 {
    font-size: 16px;
    color: #666666;
    line-height:40px;
    margin:0;
    padding:0 24px;
 }
`

