import React from 'react'
import styled from 'styled-components'
import QuickActionsCompleted from './QuickActionsCompleted'
import QuickActionsPending from './QuickActionsPending'
import QuickActionsGrace from './QuickActionsGrace'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import OrderHistory from './OrderHistory'
import Button from '@material-ui/core/Button'
import BackIcon from '@material-ui/icons/ArrowBackIos'
import { withRouter } from 'react-router'

class QuickActions extends React.Component {

    state = { value: 0 }

    handleChange = (event, value) => { this.setState({ value }) }

    gotoParentOrder() {
        this.props.history.push(`${process.env.PUBLIC_URL}/order/${this.props.parentOrder}`)
        this.props.updateParentOrder(null)
    }

    render() {
        let { value } = this.state
        let { orderID, parentOrder } = this.props
        let TabTitle = (this.props.repeat.gp_status === 'delivered' ? 'Active' : '') + " Order"
        return (
            <div>
                {(!orderID && !parentOrder) && <QuickActionTabs value={this.state.value} onChange={this.handleChange.bind(this)}>
                    <QuickActionTab disableRipple label={TabTitle} />
                    <QuickActionTab disableRipple label="Order History" />
                </QuickActionTabs>}

                {parentOrder && <CustomButton variant="contained" onClick={this.gotoParentOrder.bind(this)} aria-label="Back" >
                    <BackIcon />
                    Go Back
                </CustomButton>}

                {/* ACTIVE ORDER */}
                {value === 0 && < ActiveOrder {...this.props} />}

                {/* ORDER HISTORY */}
                {value === 1 && <div><OrderHistory {...this.props} /></div>}
            </div>
        )
    }
}

export default withRouter(QuickActions)

const ActiveOrder = (props) => {
    let expired = props.repeat.response_grace_timestamp ? new Date(props.repeat.response_grace_timestamp * 1000) < new Date() : true
    return props.repeat.gp_status === 'delivered' ? <QuickActionsPending {...props} />
        : (props.repeatsFilter === 0 && !expired) ? <QuickActionsGrace {...props} />
            : <QuickActionsCompleted {...props} />
}

const QuickActionTabs = styled(Tabs)`
&&
{
padding:5px 0;
}
&& > div > div > span
{
display:none;
}
`
const CustomButton = styled(Button)`
&&
{ 
background: none;
color: #333;
box-shadow: none;
margin: 6px 0;
}
`

const QuickActionTab = styled(Tab)`
&&
{ 
font-family: Assistant;
font-size: 18px;
font-weight: bold;
color:${props => props.selected ? '#246a8e' : '#4a4a4a'};
text-transform:none;
}
`