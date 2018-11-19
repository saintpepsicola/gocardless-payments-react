import React from 'react'
import styled from 'styled-components'

export default class NominatedSurgery extends React.Component {

    render() {
        let repeat = this.props
        return (
            <Container>
                <Title>NOMINATED SURGERY</Title>
                <Address>
                    {repeat && repeat.nominated_surgery.trim()}
                </Address>
            </Container>
        )
    }
}

const Address = styled.p`
white-space:pre;
line-height:1.5;
`

const Container = styled.div`
max-width:100%;
`

const Title = styled.h1`
font-size: 18px;
font-weight: 900;
color: #4a4a4a;
`