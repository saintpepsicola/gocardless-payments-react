import React, { Component } from 'react'
import { withRouter } from "react-router"
import styled from 'styled-components'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import commentIcon from '../../resources/comment.png'
import timeago from 'time-ago'

class RepeatsList extends Component {

    handleSelect(repeatID) {
        this.props.history.push(`${process.env.PUBLIC_URL}/order/${repeatID}`)
    }

    render() {
        return (
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
                <PendingOrders>
                    {this.props.repeats && this.props.repeats.filter(repeat => repeat.gp_status === 'delivered').map((row, index) => {
                        return (
                            <OrderRow pending='true' onClick={this.handleSelect.bind(this, row.repeat_id)} key={index}>
                                <PatientName>{row.patient_forename} {row.patient_surname}</PatientName>
                                <TableCell>{row.number_of_medicines} Medication(s)</TableCell>
                                <TableCell><FormattedDate date={row.timestamp} /></TableCell>
                                <Status>Pending</Status>
                                <TableCell>
                                    {row.comment && <img alt='repeat comment' src={commentIcon} />}
                                </TableCell>
                            </OrderRow>
                        )
                    })}

                </PendingOrders>
                {/* OTHER ORDERS */}
                <CompletedOrders>
                    {this.props.repeats && this.props.repeats.filter(repeat => repeat.gp_status !== 'delivered').map((row, index) => {
                        // { console.log(JSON.stringify(row.patient_forename)) }
                        // { console.log(JSON.stringify(row.gp_status)) }
                        return (
                            <OrderRow onClick={this.handleSelect.bind(this, row.repeat_id)} key={index}>
                                <PatientName>{row.patient_forename} {row.patient_surname}</PatientName>
                                <TableCell>{row.number_of_medicines} Medication(s)</TableCell>
                                <TableCell><FormattedDate date={row.timestamp} /></TableCell>
                                <Status>{row.gp_status}</Status>
                                <TableCell>
                                    {row.comment && <img alt='repeat comment' src={commentIcon} />}
                                </TableCell>
                            </OrderRow>
                        )
                    })}
                </CompletedOrders>
            </Table>
        )
    }
}

export default withRouter(RepeatsList)

const FormattedDate = (props) => {
    return (
        timeago.ago(props.date * 1000)
    )
}

// Styled Components
const OrderRow = styled(TableRow)`
    height:66px !important;
    cursor:pointer;

    & > td
    {
        color:#282828;
        font-size: 16px;
    } 
`
const PendingOrders = styled(TableBody)`
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
const CompletedOrders = styled(TableBody)`
  background-color: #f5f5f5;
`

const Header = styled(TableCell)`
    &&
    {
        font-size:16px;
        color: #b0b0b0;
        border:0;
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