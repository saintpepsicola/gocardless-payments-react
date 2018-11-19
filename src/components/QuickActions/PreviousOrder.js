import React from 'react'
import MedicationList from './MedicationList'
import styled from 'styled-components'

export default class PreviousOrder extends React.Component {

    render() {
        return (
            <div>
                <Title>PREVIOUS ORDER</Title>
                <MedicationList basic />
            </div>
        )
    }
}

const Title = styled.h1`
font-size: 18px;
font-weight: 900;
color: #4a4a4a;
`