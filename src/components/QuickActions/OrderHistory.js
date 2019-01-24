import React, { Component } from 'react'
import { withRouter } from 'react-router'
import styled from 'styled-components'
import KeyboardArrowRightRight from '@material-ui/icons/KeyboardArrowRight'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
// import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

class OrderHistory extends Component {

  componentDidMount() {
    const { repeat: { pod_id, patient_id, repeat_id } } = this.props
    this.props.getRepeatHistory(pod_id, patient_id, repeat_id)
  }

  handleSelect(repeatID) {
    this.props.history.push(`${process.env.PUBLIC_URL}/order/${repeatID}`)
    this.props.changeTab(3)
  }

  render() {
    const { repeat, repeatHistory } = this.props
    return (
      <div>
        {repeat && repeatHistory && <div>
          <TableContainer>
            {/* <TableHead>
              <TableRow>
                <Header>Order</Header>
                <Header>Order Date</Header>
                <Header>Status</Header>
                <Header></Header>
              </TableRow>
            </TableHead> */}
            <RepeatHistoryOrders>
              {Array.isArray(repeatHistory) && repeatHistory.map((row, index) => {
                return (
                  <TableRow key={index} onClick={this.handleSelect.bind(this, row.repeat_id)}>
                    <TableCell>{row.number_of_medicines} Medication{row.number_of_medicines === 1 ? '' : 's'}</TableCell>
                    <TableCell><FormattedDate date={row.date_created / 1000} /></TableCell>
                    <Status>{row.gp_status}</Status>
                    <TableCell>{<ArrowRight />}</TableCell>
                  </TableRow>)
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
  return new Date(Number(props.date)).toLocaleDateString('en-GB', options)
}

// Styled Components
const TableContainer = styled(Table)`
&&
{
width: 100%;
border-collapse: collapse;
display: block;
width: 1100px;
}
`

const RepeatHistoryOrders = styled(TableBody)`
&&
{
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
width:260px;
}  

&& > tr > td:nth-child(2),&& > tr > td:nth-child(3)
{
width:190px;
} 
&& > tr > td:nth-child(4)
{
flex:1;
}    

&& > tr
{
height: 66px;
width: 100%;
display: flex;
align-items: center;
cursor:pointer;
justify-content: left;
}
`

const Status = styled(TableCell)`
&&
{
font-weight:600;
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