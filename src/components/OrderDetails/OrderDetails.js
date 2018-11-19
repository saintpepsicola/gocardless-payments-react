import React from 'react'
import styled from 'styled-components'
import { withRouter } from "react-router"
import QuickActions from '../QuickActions/QuickActionsContainer'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { Flex, Box } from 'reflexbox'

class OrderDetails extends React.Component {

    async componentDidMount() {
        // Get a single Repeat
        this.props.getRepeat(this.props.match.params.orderID)

        // Get all Repeats
        //await this.props.getRepeats()
        //console.log('Order ID: ' + this.props.match.params.orderID)
        //this.props.selectRepeat(this.props.match.params.orderID)
    }

    render() {
        const patient = this.props.patient
        return (
            <div>
                <Panel defaultExpanded>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <PanelTitle>
                            Mr. Stephan Jones
                        </PanelTitle>
                    </ExpansionPanelSummary>
                    <Content>
                        <PatientDetails pl='24px' pr='24px' pt='8'>
                            <Box w={5 / 10} >
                                <Title>PATIENT DETAILS</Title>
                                <Flex m='0'>
                                    <Box w='90px'>
                                        <p>NHS:</p>
                                        <p>E-mail:</p>
                                        <p>Tel:</p>
                                        <p>Mob:</p>
                                    </Box>
                                    <Box w='249px'>
                                        <p>{patient.nhs}</p>
                                        <p>{patient.email}</p>
                                        <p>{patient.tel}</p>
                                        <p>{patient.mob}</p>
                                    </Box>
                                    <Box w='100px'>
                                        <Address>{patient.address}</Address>
                                    </Box>
                                </Flex>
                            </Box>
                            <Box w={3 / 10} >
                                <Title>NOMINATED SURGERY</Title>
                                <Flex>
                                    <Box>
                                        <Address>{patient.nominated_surgery}</Address>
                                    </Box>
                                </Flex>
                            </Box>
                            <Box>
                                <Title>NOMINATED PHARMACY</Title>
                                <Flex>
                                    <Box>
                                        <Address>{patient.nominated_pharmacy}</Address>
                                    </Box>
                                </Flex>
                            </Box>
                        </PatientDetails>
                    </Content>
                </Panel>
                <QuickActions />
            </div>
        )
    }
}

export default withRouter(OrderDetails)

const PanelTitle = styled.h3`
width:100%;
font-size:22px;
color: #4a4a4a;
margin:0;
`

const Title = styled.h4`
color: #575757;
`

const Address = styled.p`
white-space:pre;
`

const PatientDetails = styled(Flex)`
width:100%;
&  p
{
    font-size:14px;
    margin: 0;
    line-height:1.5;
    color: #575757;
}
`

const Content = styled(ExpansionPanelDetails)`
border-top: solid 1px #e4e3e3;
&&
{
    padding:0;
}
`

const Panel = styled(ExpansionPanel)`
&&
{
    background:none;
    box-shadow:none;
}
`
