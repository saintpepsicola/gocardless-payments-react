import React, { Component } from 'react'
import styled from 'styled-components'
import { Flex } from 'reflexbox'

export default class TeamMembers extends Component {

    render() {
        return (
            <Container>
                TEAM MEMBERS
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