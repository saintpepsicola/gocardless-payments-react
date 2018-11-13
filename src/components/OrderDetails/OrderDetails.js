import React from 'react'
import styled from 'styled-components'
import QuickActions from '../QuickActions/QuickActionsContainer'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { Flex, Box } from 'reflexbox'

export default class OrderDetails extends React.Component {
    render() {
        console.log(this.props.patient)
        const patient = this.props.patient
        return (
            <div>
                <Panel defaultExpanded>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <div>
                            <Typography variant='headline'>
                                Mr. Stephan Jones
                             </Typography>
                        </div>
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
                            <Box  >
                                <Title>NOMINATED SURGERY</Title>
                                <Flex>
                                    <Box>
                                        <Address>{patient.nominated_surgery}</Address>
                                    </Box>
                                </Flex>
                            </Box>
                            <Box >
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

const Title = styled.h4`

`

const Address = styled.p`
white-space:pre;
`

const PatientDetails = styled(Flex)`
  width:100%;

  &  p
  {
      font-size:14px;
      color: #575757;
  }
`

const Content = styled(ExpansionPanelDetails)`
  padding:0 !important;
`

const Panel = styled(ExpansionPanel)`
  background:none !important;
  box-shadow:none !important;
`
