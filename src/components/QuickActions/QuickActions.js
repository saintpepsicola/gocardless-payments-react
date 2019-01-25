import React from 'react'
import styled from 'styled-components'
import QuickActionsCompleted from './QuickActionsCompleted'
import QuickActionsPending from './QuickActionsPending'
import QuickActionsGrace from './QuickActionsGrace'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import OrderHistory from './OrderHistory'

export default class QuickActions extends React.Component {

    state = { value: 0 }

    handleChange = (event, value) => { this.setState({ value }) }

    render() {
        let { value } = this.state
        return (
            <div>
                <QuickActionTabs value={this.state.value} onChange={this.handleChange.bind(this)}>
                    <QuickActionTab disableRipple label="Active Order" />
                    {this.props.repeatsFilter !== 3 && <QuickActionTab disableRipple label="Order History" />}
                </QuickActionTabs>

                {/* ACTIVE ORDER */}
                {value === 0 && <ActiveOrder {...this.props} />}

                {/* ORDER HISTORY */}
                {value === 1 && <div><OrderHistory {...this.props} /></div>}

            </div>
        )
    }
}

const ActiveOrder = (props) => {
    return props.repeat.gp_status === 'delivered' ? <QuickActionsPending {...props} />
        : (props.repeatsFilter === 0 && props.repeat.response_grace_timestamp) ? <QuickActionsGrace {...props} />
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