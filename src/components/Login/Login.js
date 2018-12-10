import React, { Component } from 'react'
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField'

export default class Login extends Component {

    handleChange() {

    }

    render() {
        return (
            <Container>
                <LoginBox>
                    <TextField
                        label="Email"
                        onChange={this.handleChange()}
                        margin="normal"
                        fullWidth
                    />

                    <TextField
                        label="Password"
                        type="password"
                        onChange={this.handleChange()}
                        margin="normal"
                        fullWidth
                    />
                </LoginBox>
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
`

const LoginBox = styled.div`
padding:32px;
width: 364px;
height: 421px;
border-radius: 13px;
box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
background-color: #ffffff;
`