import React, { Component } from 'react'
import styled from 'styled-components'

type Props ={}
export default class UserAvatar extends Component<Props> {

    render() {
        return (
            <Avatar xs>
                <img alt='user-avatar' src='http://placehold.it/300' />
            </Avatar>
        )
    }
}

// Styled Components
const Avatar = styled.div`
  & > img
  {
    max-height:60px;
    width:auto;
    border-radius:50%;
    border:11px solid coral;
  }
`