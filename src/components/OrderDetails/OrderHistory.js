import React, { Component } from 'react'
import styled from 'styled-components'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import timeago from 'time-ago'

class OrderHistory extends Component {

  render() {
    const { fetching, repeat } = this.props
    
    return (
      <div>
        {!fetching && repeat && <div>
        <Panel defaultExpanded>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
          <Title>ORDER HISTORY</Title>
        </ExpansionPanelSummary>
            <Table>
              <TableHead>
                <TableRow>
                  <Header>Patient Name</Header>
                  <Header>Order</Header>
                  <Header>Date</Header>
                  <Header>Status</Header>
                  <Header></Header>
                </TableRow>
              </TableHead>
              {/* PENDING ORDERS */}
              <RepeatHistoryOrders>
                {Array.isArray(repeat.repeatHistory) && repeat.repeatHistory.map((row, index) => {                  
                    return (
                      <OrderRow key={index}>
                        <PatientName>{repeat.patient_forename} {repeat.patient_surname}</PatientName>
                        <TableCell>{row.number_of_medicines} Medication(s)</TableCell>
                        <TableCell><FormattedDate date={row.timestamp} /></TableCell>
                        <Status>{row.gp_status}</Status>
                        <TableCell>
                        </TableCell>
                      </OrderRow>
                    )
                })}
              </RepeatHistoryOrders>
            </Table>
          </Panel>
        </div>}
      </div>
    )
  }
}

export default OrderHistory

const FormattedDate = (props) => {
  return (
    timeago.ago(props.date * 1000)
  )
}

// Styled Components

const Title = styled.h4 `
  color: #575757;
  margin-top: 0px;
`

const OrderRow = styled(TableRow)`
    height:66px !important;
    & > td
    {
        color:#282828;
        font-size: 16px;
    } 
`

const Header = styled(TableCell)`
    &&
    {
        font-size:16px;
        color: #b0b0b0;
        border:0;
    }
`

const RepeatHistoryOrders = styled(TableBody)`
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.15);
  background-color: #ffffff;

  & tr
  {
    transition: all 0.3s cubic-bezier(.25,.8,.25,1);
     box-shadow:none;
  }

  & tr:hover
 {
    background-color: #ebebeb;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
 }
`

const PatientName = styled(TableCell)`
    &&
    {
        font-weight:bold;
    }
`

const Status = styled(TableCell)`
    &&
    {
        font-weight:bold;
        text-transform:capitalize;
        color: ${props => statusColors[props.children]};
        font-size: 16px;
    }
`

const statusColors = {
  'Pending': '#f57123',
  'accepted': '#509500',
  'declined': '#d0021b',
  'Processing': '#2f84b0',
}

const Panel = styled(ExpansionPanel)`
  &&
    {
      background: none;
      box-shadow:none;
      padding-bottom: 50px;
    }
`