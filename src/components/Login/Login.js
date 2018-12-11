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

    render() {
        let { error, authenticated } = this.props
        if (authenticated)
            return <Redirect to='/' />

        return (
            <Container>
                <div>
                    <LogoImg src={logo} align="right" alt='Healthera Logo' />
                    <LoginBox>
                        <TextField
                            label="Email"
                            onChange={this.handleChange.bind(this, 'username')}
                            margin="normal"
                            fullWidth
                        />
                        <TextField
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
                    </LoginBox>
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
            text-align:center;
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

const LogoImg = styled.img`
            width: 210px;
            height: 29px;
            margin-bottom:16px;
`

const LoginBox = styled.div`
    padding:32px;
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
        margin-top:73px;
        border-radius: 24px;
        box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.3);
        background-color: #257195;
        height: 43px;
    }
`