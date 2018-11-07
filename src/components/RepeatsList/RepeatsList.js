import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { withRouter } from "react-router"
import styled from 'styled-components'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

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
]

class RepeatsList extends Component {

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
                                <OrderRow onClick={() => this.props.history.push(`${process.env.PUBLIC_URL}/qorder/${index}`)} key={index}>
                                    <Cell>{row.name}</Cell>
                                    <Cell>{row.order}</Cell>
                                    <Cell>{row.date}</Cell>
                                    <Cell>{row.status}</Cell>
                                </OrderRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </Paper>
        )
    }
}

//     <Typography variant='h6'>

const Cell = (props) => <TableCell><Typography variant='subtitle1'>{props.children}</Typography></TableCell>

export default withRouter(RepeatsList)

// Proptypes


// Styled Components
const OrderRow = styled(TableRow)`
    height:66px !important;
    cursor:pointer;
`;