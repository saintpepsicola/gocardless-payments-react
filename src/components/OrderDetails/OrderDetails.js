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
                        <Flex pt='16px'>
                            <Box w={7 / 10} >
                                <Typography variant='subtitle1'>
                                    Patient Details
                                     </Typography>
                                <Flex>
                                    <Box><p>NHS:</p></Box>
                                    <Box><p>3432432</p></Box>
                                </Flex>
                            </Box>
                            <Box w={3 / 10} > gfdgfdgfdgdf</Box>
                        </Flex>
                    </Content>
                </Panel>
                <QuickActions />
            </div>
        )
    }
}

const Content = styled(ExpansionPanelDetails)`
  padding:0 !important;
`

const Panel = styled(ExpansionPanel)`
  background:none !important;
  box-shadow:none !important;
`
