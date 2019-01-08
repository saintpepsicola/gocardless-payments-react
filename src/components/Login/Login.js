import React, { Component } from 'react'
import styled from 'styled-components'
import logo from '../../resources/Logo@3x.png'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { Redirect } from 'react-router-dom'

export default class Login extends Component {

    state = { username: '', password: '' }

    handleChange(key, e) {
        this.setState({ [key]: e.target.value.trim() })
    }

    handleClick() {
        // Login User
        let { username, password } = this.state
        this.props.login(username, password)
    }

    handlePasswordReset() {
        let email = prompt("What's your username?")
        if (email)
            this.props.resetPassword(email)
    }

    render() {
        let { error, authenticated } = this.props
        if (authenticated)
            return <Redirect to='/' />
        return (
            <Container>
                <div>
                    <LogoImg src={logo} align="right" alt='Healthera Logo' />
                    <LoginBox>
                        <Input
                            label="Email"
                            onChange={this.handleChange.bind(this, 'username')}
                            margin="normal"
                            fullWidth
                        />
                        <Input
                            label="Password"
                            type="password"
                            onChange={this.handleChange.bind(this, 'password')}
                            margin="normal"
                            fullWidth
                        />
                        <ErrorBox error={error}>{error}</ErrorBox>
                        <LoginButton onClick={this.handleClick.bind(this)} variant="contained" color="primary" aria-label="Login" >
                            Login
                        </LoginButton>
                        <Link onClick={this.handlePasswordReset.bind(this)}>Forgot Password</Link>
                        <Link onClick={() => this.props.showSupportInfo()}>Support</Link>
                    </LoginBox>
                    <Copyright>Copyrights 2018. Healthera LTD. All rights reserved</Copyright>
                </div>
            </Container>
        )
    }
}

const Container = styled.div`
height:100vh;
display:flex;
justify-content:center;
align-items:center;
background-image: linear-gradient(to bottom, #257397, #24678b);

& > div
{
text-align: center;
}
`

const Input = styled(TextField)`
&&
{
color:#257094;
margin-bottom:57px;
}
&& input
{
border-bottom:2px solid #256d91;
}
`

const ErrorBox = styled.div`
display: ${props => props.error ? 'block' : 'none'};
background: #ffebeb;
border-radius: 25px;
margin: 16px auto;
padding: 16px;
font-size: 12px;
`

const Link = styled.p`
font-size: 13px;
color: #256e92;
cursor:pointer;
`

const Copyright = styled.p`
font-size: 10px;
text-align: center;
color: #5f95af;
`

const LogoImg = styled.img`
width: 210px;
height: 29px;
margin-bottom:25px;
`

const LoginBox = styled.div`
padding:55px 32px 32px;
width: 364px;
height: 421px;
border-radius: 13px;
box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
background-color: #ffffff;
`

const LoginButton = styled(Button)`
&&  {
width: 106px;
margin:16px 0;
margin-top:55px;
border-radius: 24px;
box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.3);
background-color: #257195;
height: 43px;
text-transform:capitalize;
font-size: 14px;
text-align: center;
}
`