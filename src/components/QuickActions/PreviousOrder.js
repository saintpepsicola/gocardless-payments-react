import React from 'react'
import MedicationList from './MedicationList/MedicationListContainer'
import styled from 'styled-components'

export default class PreviousOrder extends React.Component {

    render() {
        return (
            <Container>
                <Title>PREVIOUS ORDER</Title>
                <MedicationList basic />
                <ApprovedBy>Approved by John Appleseed - 22/10/2019</ApprovedBy>
            </Container>
        )
    }
}

const Container = styled.div`
position:relative;
height:100%;
`

const Title = styled.h1`
font-size: 18px;
font-weight: 900;
color: #4a4a4a;
`

const ApprovedBy = styled.p`
position:absolute;
bottom:16px;
font-size: 12px;
font-weight: 600;
margin:0;
color: #9e9e9e;
`