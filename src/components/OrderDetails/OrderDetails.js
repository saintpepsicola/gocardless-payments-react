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

    componentDidMount() {
        // Get a single Repeat
        this.props.getRepeat(this.props.match.params.orderID)
    }

    render() {
        //console.log(this.props.repeat && this.props.repeat.patient, this.props.repeat)
        let { repeat, fetching } = this.props
        return (
            <div>
                {!fetching && repeat && <div>
                    <Panel defaultExpanded>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <PanelTitle>
                                {repeat.patient_forename} {repeat.patient_surname}
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
                                            <p>{repeat.patient.nhs_number}</p>
                                            <p>{repeat.patient.username}</p>
                                            <p>{repeat.patient.telephone}</p>
                                            <p>{repeat.patient.telephone}</p>
                                        </Box>
                                        <Box w='100px'>
                                            <Address>{repeat.patient.address}</Address>
                                        </Box>
                                    </Flex>
                                </Box>
                                <Box w={3 / 10} >
                                    <Title>NOMINATED SURGERY</Title>
                                    <Flex>
                                        <Box>
                                            <Address>
                                                {repeat.surgery.address_1}<br />
                                                {repeat.surgery.address_2}<br />
                                                {repeat.surgery.address_3}<br />
                                                {repeat.surgery.postcode}<br />
                                            </Address>
                                        </Box>
                                    </Flex>
                                </Box>
                                <Box>
                                    <Title>NOMINATED PHARMACY</Title>
                                    <Flex>
                                        <Box>
                                            <Address>
                                                {repeat.pharmacy.pharmacy_name}<br />
                                                {repeat.pharmacy.address}<br />
                                                {repeat.pharmacy.postcode}<br />
                                                {repeat.pharmacy.telephone}<br />
                                            </Address>
                                        </Box>
                                    </Flex>
                                </Box>
                            </PatientDetails>
                        </Content>
                    </Panel>
                    <QuickActions />
                </div>}
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
white-space:pre-line;
text-transform:uppercase;
`

const PatientDetails = styled(Flex)`
width:100%;
&  p
{
    font-size:13px;
    margin:0;
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
