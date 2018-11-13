import React, { Component } from 'react'
import { withRouter } from "react-router"
import styled from 'styled-components'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import commentIcon from '../../resources/comment.png'

class RepeatsList extends Component {
    render() {
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
                    {this.props.repeats && this.props.repeats.filter(repeat => repeat.status === 'Pending').map((row, index) => {
                        return (
                            <OrderRow pending='true' onClick={() => this.props.history.push(`${process.env.PUBLIC_URL}/order/${index}`)} key={index}>
                                <PatientName>{row.name}</PatientName>
                                <TableCell>{row.order}</TableCell>
                                <TableCell>{row.date}</TableCell>
                                <Status>{row.status}</Status>
                                <TableCell>
                                    {row.comments && <img alt='repeat comment' src={commentIcon} />}
                                </TableCell>
                            </OrderRow>
                        )
                    })}

                </PendingOrders>
                {/* OTHER ORDERS */}
                <CompletedOrders>
                    {this.props.repeats && this.props.repeats.filter(repeat => repeat.status !== 'Pending').map((row, index) => {
                        return (
                            <OrderRow onClick={() => this.props.history.push(`${process.env.PUBLIC_URL}/order/${index}`)} key={index}>
                                <PatientName>{row.name}</PatientName>
                                <TableCell>{row.order}</TableCell>
                                <TableCell>{row.date}</TableCell>
                                <Status>{row.status}</Status>
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
        color: ${props => props.children === 'Pending' ? '#f57123' : props.children === 'Accepted' ? '#509500' : '#d0021b'};
        font-size: 16px;
    }
`