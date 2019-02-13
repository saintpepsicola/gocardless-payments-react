import React from 'react'
import styled from 'styled-components'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import OrderHistory from './OrderHistory'
import Button from '@material-ui/core/Button'
import BackIcon from '@material-ui/icons/ArrowBackIos'
import { withRouter } from 'react-router'
import { Flex, Box } from 'reflexbox'
import Paper from '@material-ui/core/Paper'
import MedicationList from './MedicationList'
import PanelControls from './PanelControls/PanelControlsContainer'
import SidePanel from './SidePanel/SidePanelContainer'
import ProcessButton from './ProcessButton'

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
        let { repeat, medicines } = this.props
        let showProcess = medicines && medicines.filter(remedy => !remedy.approved).length !== 0 ? true : false
        let expired = repeat.response_grace_timestamp ? new Date(repeat.response_grace_timestamp * 1000) < new Date() : true

        let pending = repeat.gp_status === 'delivered'
        let grace = !pending && !expired
        let completed = !pending && !grace
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
                {value === 0 &&
                    <Container>
                        <Flex>
                            <Box p='22px' mr='16px' w={7 / 10} >
                                <Header justify='space-between' >
                                    <Box align='center' w={8 / 10} >
                                        <OrderTitle><Bigger>{repeat.number_of_medicines} Medication{repeat.number_of_medicines === 1 ? '' : 's'}</Bigger> | <FormattedDate date={repeat.date_created} /> </OrderTitle>
                                    </Box>
                                    <PanelBox w={6 / 10} > <PanelControls completed={completed} /> </PanelBox>
                                </Header>
                                <Flex>
                                    <MedicationList withinGracePeriod={grace} completed={completed} {...this.props} />
                                </Flex>
                                {showProcess && pending && <Flex justify='flex-end'>
                                    <ProcessButton label={`Process`} {...this.props} />
                                </Flex>}
                                {!showProcess && pending && <Flex justify='flex-end'>
                                    <ProcessButton label={`Reject`} {...this.props} />
                                    <ProcessButton label={`Approve`} {...this.props} />
                                </Flex>}
                                {grace && <Flex justify='flex-end'>
                                    <ProcessButton label={`Complete`} {...this.props} />
                                </Flex>}
                            </Box>
                            <Box w={3 / 10} ><SidePanel {...this.props} chat={!completed ? true : false} /></Box>
                        </Flex>
                    </Container>
                }

                {/* ORDER HISTORY */}
                {value === 1 && <div><OrderHistory {...this.props} /></div>}
            </div>
        )
    }
}

export default withRouter(QuickActions)

const FormattedDate = (props) => {
    let date = new Date(Number(props.date))
    return date.toDateString() === new Date().toDateString() ? `Today, ${date.toLocaleTimeString('en-GB', { hour: 'numeric', minute: 'numeric' })}` : date.toLocaleDateString('en-GB', { hour: 'numeric', minute: 'numeric' })
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
const Container = styled(Paper)`
&& {
border-radius: 13px;
width:100%;
margin-bottom:16px;
overflow: hidden;
background:#f9f9f9;
}
`

const Header = styled(Flex)`
border-bottom:1px solid #e5e5e5;
`

const PanelBox = styled(Box)`
text-align:right;
`

const Bigger = styled.span`
font-size: 19px;
font-weight: 700;
color: #282828;
`

const OrderTitle = styled.h6`
font-size: 16px;
font-weight: normal;
color: #282828;
margin:0;
padding: 14px 0;
`