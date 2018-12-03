import React from 'react'
import styled from 'styled-components'
import Paper from '@material-ui/core/Paper'
import { Flex, Box } from 'reflexbox'
import MedicationList from './MedicationList/MedicationListContainer'
import PanelControls from './PanelControls/PanelControlsContainer'
import SidePanel from './SidePanel/SidePanelContainer'
import ProcessButton from './ProcessButton'
import timeago from 'time-ago'

export default class QuickActions extends React.Component {

    render() {
        let { repeat } = this.props
        let completeDisabled = repeat.remedies && repeat.remedies.filter(remedy => remedy.approved).length === 0 ? true : false
        if (repeat.gp_status === 'delivered') {
            return (
                <Container>
                    <Flex>
                        <Box p='22px' mr='16px' w={7 / 10} >
                            <Flex justify='space-between'>
                                <Box align='center' w={8 / 10} >
                                    <OrderTitle> <Bigger>{repeat.number_of_medicines} Medications</Bigger> | <FormattedDate date={repeat.date_created} /> </OrderTitle>
                                </Box>
                                <Box w={6 / 10} > <PanelControls /> </Box>
                            </Flex>
                            <Flex>
                                <MedicationList {...this.props} />
                            </Flex>
                            <Flex justify='space-between' align='center'>
                                <Box align='center' w={8 / 10}>
                                    <ProcessButton label={`Reject order`} {...this.props} />
                                </Box>
                                <Box w={3 / 10}>
                                    <ProcessButton label={`Process later`} {...this.props} />
                                </Box>
                                <Box >
                                    <ProcessButton disabled={completeDisabled} label={`Complete`} {...this.props} />
                                </Box>
                            </Flex>
                        </Box>
                        <Box w={3 / 10} > <SidePanel /></Box>
                    </Flex>
                </Container>
            )
        }
        return null;
    }
}

const FormattedDate = (props) => {
    return timeago.ago(Number(props.date))
}

const Container = styled(Paper)`
  width:100%;
  margin-bottom:16px;
`

const Bigger = styled.span`
font-size: 16px;
font-weight: 700;
color: #4a4a4a;
`

const OrderTitle = styled.h6`
  font-size: 16px;
  font-weight: normal;
  color: #282828;
  margin:0;
  padding: 14px 0;
`