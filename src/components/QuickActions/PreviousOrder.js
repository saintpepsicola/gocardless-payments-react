import React from 'react'
import MedicationList from './MedicationList/MedicationListContainer'
import styled from 'styled-components'

export default class PreviousOrder extends React.Component {
    render() {
        const { repeat: { previous_order } } = this.props
        let previousOrderDate = null
        if (previous_order) {
            previousOrderDate = new Date(Number(previous_order.date_created))
        }
        return (
            <Container>
                <Title>PREVIOUS ORDER</Title>
                <MedicationList basic />
                <OrderDate>Order Date: {previousOrderDate && previousOrderDate.toLocaleDateString()}</OrderDate>
            </Container>
        )
    }
}

const OrderDate = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: #9e9e9e;
  text-align:right;
`

const Container = styled.div`
position:relative;
height:100%;
`

const Title = styled.h1`
font-size: 18px;
font-weight: 900;
color: #4a4a4a;
`
