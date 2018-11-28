import React from 'react'
import styled from 'styled-components'

export default class NominatedSurgery extends React.Component {

    render() {
        let repeat = this.props
        return (
            <Container>
                <Title>SURGERY</Title>
                <Address>
                    {repeat.surgery.address_1} < br />
                    {repeat.surgery.address_2} < br />
                    {repeat.surgery.address_3} < br />
                    {repeat.surgery.postcode} < br />
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