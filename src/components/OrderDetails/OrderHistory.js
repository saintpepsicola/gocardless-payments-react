import React, { Component } from 'react'
import { withRouter } from 'react-router'
import styled from 'styled-components'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import KeyboardArrowRightRight from '@material-ui/icons/KeyboardArrowRight'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

class OrderHistory extends Component {

  componentDidMount() {
    const { repeat } = this.props
    const podID = repeat.pod_id
    const patientID = repeat.patient_id
    const repeatID = repeat.repeat_id
    this.props.getRepeatHistory(podID, patientID, repeatID)
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
          <Panel defaultExpanded>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Title>ORDER HISTORY</Title>
            </ExpansionPanelSummary>
            <Table>
              <TableHead>
                <TableRow>
                  <Header>Order</Header>
                  <Header>Order Date</Header>
                  <Header>Status</Header>
                  <Header></Header>
                </TableRow>
              </TableHead>
              {/* PENDING ORDERS */}
              <RepeatHistoryOrders>
                {Array.isArray(repeatHistory) && repeatHistory.map((row, index) => {
                  return (
                    <OrderRow key={index} onClick={this.handleSelect.bind(this, row.repeat_id)}>
                      <TableCell>{row.number_of_medicines} Medication{row.number_of_medicines === 1 ? '' : 's'}</TableCell>
                      <TableCell><FormattedDate date={row.date_created / 1000} /></TableCell>
                      <Status>{row.gp_status}</Status>
                      <TableCell>{<ArrowRight />}</TableCell>
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

export default withRouter(OrderHistory)

const FormattedDate = (props) => {
  let options = { weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: true }
  return new Date(Number(props.date)).toLocaleDateString('en-GB', options)
}

// Styled Components
const Title = styled.h4`
  color: #575757;
  margin: 0px;
`

const OrderRow = styled(TableRow)`
&&
{
height:66px !important;
}
& > td
{
  color:#282828;
  font-size: 16px;
  cursor: pointer;
  position:relative;
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
background-color: #f9f9f9;

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

const ArrowRight = styled(KeyboardArrowRightRight)`
&&
{
  color: #6E6E6E;
  right:14px;
  top: 21px;
  position: absolute;
}
`