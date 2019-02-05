import React, { Component } from 'react'
import { withRouter } from 'react-router'
import styled from 'styled-components'
import KeyboardArrowRightRight from '@material-ui/icons/KeyboardArrowRight'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'

class OrderHistory extends Component {

  state = { show: false, orderID: null }

  componentDidMount() {
    const { repeat: { pod_id, patient_id, repeat_id } } = this.props
    this.props.getRepeatHistory(pod_id, patient_id, repeat_id)
    this.setState({ orderID: repeat_id })
  }

  handleSelect(repeatID) {
    this.props.updateParentOrder(this.state.orderID)
    this.props.history.push(`${process.env.PUBLIC_URL}/order/${repeatID}`)
  }

  render() {
    const { repeat, repeatHistory } = this.props
    return (
      <div>
        {repeatHistory.length === 0 && <NoRepeatsMessage />}
        {repeat && repeatHistory && <div>
          <TableContainer hide={this.state.show ? 1 : 0}>
            <RepeatHistoryOrders>
              {Array.isArray(repeatHistory) && repeatHistory.map((row, index) => {
                return (
                  <TableRow key={index} onClick={this.handleSelect.bind(this, row.repeat_id)}>
                    <TableCell>{row.number_of_medicines} Medication{row.number_of_medicines === 1 ? '' : 's'}</TableCell>
                    <TableCell><FormattedDate date={row.date_created} /></TableCell>
                    <Status>{row.gp_status}</Status>
                    <TableCell>{<ArrowRight />}</TableCell>
                  </TableRow>
                )
              })}
            </RepeatHistoryOrders>
          </TableContainer>
        </div>}
      </div>
    )
  }
}

export default withRouter(OrderHistory)

const FormattedDate = (props) => {
  let options = { weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: true }
  return new Date(Number(Math.floor(props.date))).toLocaleDateString('en-GB', options)
}

const NoRepeatsMessage = () => {
  return <BigBox>No Previous Orders.</BigBox>
}

// Styled Components
const BigBox = styled.section`
&&
{
color: #6E6E6E;
height: 60vh;
width: 100%;
display: flex;
justify-content: center;
align-items: center;
font-size: 22px;
}
`

const TableContainer = styled(Table)`
&&
{
width: 100%;
border-collapse: collapse;
display: ${props => props.hide ? 'none' : 'block'};
width: 1100px;
}
`

const RepeatHistoryOrders = styled(TableBody)`
&&
{
position: relative;
background-color: #f9f9f9;
border-radius: 13px;
display: block;
}

&& > tr > td
{
height: 66px;
display: flex;
justify-content: left;
align-items: center;
box-sizing: border-box;
padding:0;
padding-left:27px;
font-size: 16px;
}

&& > tr > td:first-child
{
width: 260px;
}

&& > tr > td:nth-child(2),&& > tr > td:nth-child(3)
{
width: 190px;
}
&& > tr > td:nth-child(4)
{
flex: 1;
}

&& > tr
{
height: 66px;
width: 100%;
display: flex;
position:relative;
align-items: center;
cursor:pointer;
justify-content: left;
}
`

const Status = styled(TableCell)`
&&
{
font-weight: 600;
text-transform:capitalize;
color: ${props => statusColors[props.children]};
font-size: 16px;
font-family: Assistant;
}
`

const statusColors = {
  'Pending': '#f57123',
  'accepted': '#419646',
  'declined': '#d0021b',
  'Processing': '#2f84b0',
}

const ArrowRight = styled(KeyboardArrowRightRight)`
&&
{
color: #6E6E6E;
right:14px;
top: 21px;
position: absolute;
}
`