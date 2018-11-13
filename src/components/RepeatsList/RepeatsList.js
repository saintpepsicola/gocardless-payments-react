import React, { Component } from 'react'
import { withRouter } from "react-router"
import styled from 'styled-components'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

class RepeatsList extends Component {
    render() {
        return (
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Patient Name</TableCell>
                            <TableCell>Order</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.repeats && this.props.repeats.map((row, index) => {
                            return (
                                <OrderRow onClick={() => this.props.history.push(`${process.env.PUBLIC_URL}/order/${index}`)} key={index}>
                                    <PatientName>{row.name}</PatientName>
                                    <Order>{row.order}</Order>
                                    <Date>{row.date}</Date>
                                    <Status>{row.status}</Status>
                                </OrderRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </Paper>
        )
    }
}

export default withRouter(RepeatsList)

// Styled Components
const OrderRow = styled(TableRow)`
    height:66px !important;
    cursor:pointer;
`

const PatientName = styled(TableCell)`
    &&
    {
        font-weight:bold;
        color: #282828;
        font-size: 16px;
    }
`

const Order = styled(TableCell)`
    &&
    {
        color: #282828;
        font-size: 16px;
    }
`

const Date = styled(TableCell)`
    &&
    {
        color: #282828;
        font-size: 16px;
    }
`

const Status = styled(TableCell)`
    &&
    {
        color: #282828;
        font-size: 16px;
    }
`