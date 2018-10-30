import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import styled from 'styled-components'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper';

// Dummy Data
function createData(name, order, date, status) {
    return { name, order, date, status }
}
const rows = [
    createData('Stephen George James', '3 Medications', 'Today 12:03 PM', 'Pending'),
    createData('Stephen George James', '3 Medications', 'Today 12:03 PM', 'Pending'),
    createData('Stephen George James', '3 Medications', 'Today 12:03 PM', 'Pending'),
    createData('Stephen George James', '3 Medications', 'Today 12:03 PM', 'Accepted'),
    createData('Stephen George James', '3 Medications', 'Today 12:03 PM', 'Accepted'),
    createData('Stephen George James', '3 Medications', 'Today 12:03 PM', 'Rejected')
];

export default class RepeatsList extends Component {

    render() {
        return (
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell >Patient Name</TableCell>
                            <TableCell >Order</TableCell>
                            <TableCell >Date</TableCell>
                            <TableCell >Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => {
                            return (
                                <OrderRow key={index}>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.order}</TableCell>
                                    <TableCell>{row.date}</TableCell>
                                    <TableCell>{row.status}</TableCell>
                                </OrderRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </Paper>
        )
    }
}

// Proptypes


// Styled Components
const OrderRow = styled(TableRow)`
    height:66px !important;
`;