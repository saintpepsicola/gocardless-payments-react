import React, { Component } from 'react'
import styled from 'styled-components'
import { Flex, Box } from 'reflexbox'
import CloseIcon from '@material-ui/icons/Close'

export default class UserProfile extends Component {

    state = { teamMembers: false }

    componentDidMount() {
        this.props.getTeamMembers(this.props.podID)
    }

    logout() {
        if (window.confirm('Are you sure you wish to logout?')) {
            this.props.logout()
        }
    }

    closeProfile() {
        this.props.closeProfile()
    }

    toggleView(value) {
        this.setState({ teamMembers: value })
    }

    render() {
        let { user, userName } = this.props
        return (
            <Container width='300px' >
                <CloseProfile onClick={this.closeProfile.bind(this)} />
                <SideBar w={364}>
                    <Username>{this.props.userName}</Username>
                    <Action onClick={this.toggleView.bind(this, false)}> Profile</Action>
                    <Action onClick={this.toggleView.bind(this, true)}>Team Members</Action>

                    <Links>
                        <Link target='_blank' href='https://healthera.co.uk/'>Legal</Link>
                        <Link target='_blank' href='https://healthera.co.uk/'>Terms & Conditions</Link>
                        <Link onClick={this.logout.bind(this)}> Logout</Link>
                    </Links>
                </SideBar>
                <Content auto>
                    {/* PROFILE */}
                    {!this.state.teamMembers && <div>
                        <Header>Profile</Header>
                        <Subheader>Personal Information</Subheader>

                        <Info><span>Name:</span>{userName}</Info>
                        <Info><span>Date of Birth:</span><Birthdate dob={user.birthday} /></Info>

                        <Subheader border>Account information</Subheader>

                        <Info><span>Email Address:</span>{user.username}</Info>
                        <Info><span>Password:</span>●●●●●●●●●</Info>
                    </div>}

                    {/* TEAM MEMBERS */}
                    {this.state.teamMembers && <div>
                        <Header>TEAM MEMBERS</Header>
                        <Scroll>
                            {this.props.team.length !== 0 && this.props.team.filter(member => member.user_id !== user.user_id).map(member => {
                                return (<Member key={member.user_id}>{member.forename} {member.surname}
                                    <span>{member.username}</span>
                                </Member>)
                            })}
                        </Scroll>
                    </div>}

                </Content>
            </Container >
        )
    }
}

const Birthdate = (props) => {
    let { dob } = props
    dob = new Date(dob * 1000)
    return dob.toLocaleDateString()
}

// Styled Components
const Scroll = styled.div`
&&
{
height: calc(100vh - 200px);
overflow-y:auto;
}
`

const CloseProfile = styled(CloseIcon)`
&&
{
font-size: 35px;
position: absolute;
right: 28px;
top: 28px;
z-index: 3;
cursor:pointer;
}
`

const Container = styled(Flex)`
&&
{
min-height:100vh;
width:100vw;
position:relative;
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
z-index: 1;
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

const Member = styled.p`
&&
{
font-size: 16px;
font-weight: bold;
color: #282828;
line-height:76px;
border-bottom:1px solid #dcdcdc;

    && span
    {
    display: block;
    line-height: 1;
    padding-bottom: 18px;
    font-weight: 400;
    font-size: 15px;
    }
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
bottom: 10px;
}
`

const Link = styled.a`
&&
{
font-size: 16px;
display:block;
font-weight: 300;
color: #8ab6cb;
line-height:2.5;
cursor:pointer;
text-decoration:none;
}
`

