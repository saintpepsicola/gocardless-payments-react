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
        //console.log(repeatID)
        // this.props.selectRepeat(index)
        this.props.history.push(`${process.env.PUBLIC_URL}/order/${repeatID}`)
    }

    render() {
        // console.log(this.props)
        return (
            <Table>
                <TableHead>
                    <TableRow>
                        <Header>Patient Name</Header>
                        <Header>Order</Header>
                        <Header>Date</Header>
                        <Header>Status</Header>
                        <TableCell></TableCell>
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
                                    {row.comments && <img alt='repeat comment' src={commentIcon} />}
                                </TableCell>
                            </OrderRow>
                        )
                    })}

                </PendingOrders>
                {/* OTHER ORDERS */}
                <CompletedOrders>
                    {this.props.repeats && this.props.repeats.filter(repeat => repeat.gp_status !== 'delivered').map((row, index) => {
                        return (
                            <OrderRow onClick={() => this.props.history.push(`${process.env.PUBLIC_URL}/order/${index}`)} key={index}>
                                <PatientName>{row.patient_forename} {row.patient_surname}</PatientName>
                                <TableCell>{row.number_of_medicines} Medication(s)</TableCell>
                                <TableCell><FormattedDate date={row.timestamp} /></TableCell>
                                <Status>Pending</Status>
                                <TableCell>
                                    {row.comments && <img alt='repeat comment' src={commentIcon} />}
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
`
const CompletedOrders = styled(TableBody)`
  background-color: #f5f5f5;
`

const Header = styled(TableCell)`
    &&
    {
        font-size:16px;
        color: #b0b0b0;
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
        color: ${props => statusColors[props.children]};
        font-size: 16px;
    }
`

const statusColors = {
    'Pending': '#f57123',
    'Accepted': '#509500',
    'Rejected': '#d0021b',
    'Processing': '#2f84b0',
}