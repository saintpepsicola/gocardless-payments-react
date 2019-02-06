import React from 'react'
import styled from 'styled-components'
import Paper from '@material-ui/core/Paper'
import { Flex, Box } from 'reflexbox'
import MedicationList from './MedicationList'
import PanelControls from './PanelControls/PanelControlsContainer'
import SidePanel from './SidePanel/SidePanelContainer'
import ProcessButton from './ProcessButton'

export default class QuickActionsPending extends React.Component {
    render() {
        let { repeat, medicines } = this.props
        let showProcess = medicines && medicines.filter(remedy => !remedy.approved).length !== 0 ? true : false
        return (
            <Container>
                <Flex>
                    <Box p='22px' mr='16px' w={7 / 10} >
                        <Header justify='space-between'>
                            <Box align='center' w={8 / 10} >
                                <OrderTitle><Bigger>{repeat.number_of_medicines} Medication{repeat.number_of_medicines === 1 ? '' : 's'}</Bigger> | <FormattedDate date={repeat.date_created} /> </OrderTitle>
                            </Box>
                            <PanelBox w={6 / 10} > <PanelControls /> </PanelBox>
                        </Header>
                        <Flex>
                            <MedicationList {...this.props} />
                        </Flex>
                        {showProcess && <Flex justify='flex-end'>
                            <ProcessButton label={`Process`} {...this.props} />
                        </Flex>}
                        {!showProcess && <Flex justify='flex-end'>
                            <ProcessButton label={`Reject`} {...this.props} />
                            <ProcessButton label={`Approve`} {...this.props} />
                        </Flex>}
                    </Box>
                    <Box w={3 / 10} ><SidePanel chat={true} /></Box>
                </Flex>
            </Container >
        )
    }
}

const FormattedDate = (props) => {
    let options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }
    let date = new Date(Number(props.date))
    return date.toDateString() === new Date().toDateString() ? `Today, ${date.toLocaleTimeString('en-GB', { hour: 'numeric', minute: 'numeric' })}` : date.toLocaleDateString('en-GB', options)
}

const Header = styled(Flex)`
border-bottom:1px solid #e5e5e5;
`

const PanelBox = styled(Box)`
text-align:right;
`

const Container = styled(Paper)`
&& {
border-radius: 13px;
width:100%;
margin-bottom:16px;
overflow: hidden;
}
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