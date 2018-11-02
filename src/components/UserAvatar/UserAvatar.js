import React, { Component } from 'react'
import styled from 'styled-components'

export default class UserAvatar extends Component{

    render() {
        return (
            <Avatar>
                <img alt='user-avatar' src='http://placehold.it/300' />
            </Avatar>
        )
    }
}

// Styled Components
const Avatar = styled.div`
  text-align:left;
  & > img
  {
    text-align:left;
    max-height:60px;
    width:auto;
    border-radius:50%;
    border:3px solid coral;
  }
`