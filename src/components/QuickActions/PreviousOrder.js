import React from 'react'
import MedicationList from './MedicationList/MedicationListContainer'
import styled from 'styled-components'
import timeago from 'time-ago'

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
                {!previousOrderDate && <p>This is the first order for this patient!</p>}
                <MedicationList basic />
                {previousOrderDate && <OrderDate>Order Date: {previousOrderDate && previousOrderDate.toLocaleDateString()} • <FormattedDate date={previousOrderDate} /> </OrderDate>}
            </Container>
        )
    }
}

const FormattedDate = (props) => {
    return timeago.ago(Number(props.date))
}

const OrderDate = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: #9e9e9e;
  text-align:right;
  bottom: 10px;
  position: absolute;
  right: 0px;
`

const Container = styled.div`
position:relative;
height:100%;
`

const Title = styled.h1`
font-size:17px;
color:#575756;
font-weight:'900';
display:flex;
text-transform:'none';
align-items:center;
border-bottom:1px solid #e5e5e5;
padding:14px;
padding-bottom:30px;
`
