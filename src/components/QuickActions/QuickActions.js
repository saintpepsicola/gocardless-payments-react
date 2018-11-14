import React from 'react'
import styled from 'styled-components'
import Paper from '@material-ui/core/Paper'
import { Flex, Box } from 'reflexbox'
import Typography from '@material-ui/core/Typography'
import MedicationList from './MedicationList'
import PanelControls from './PanelControls'
import SidePanel from './SidePanel'

export default class QuickActions extends React.Component {
    render() {
        return (
            <Container>
                <Flex>
                    <Box p='22px' mr='16px' w={7 / 10} >
                        <Flex justify='space-between'>
                            <Box align='center' w={8 / 10} >
                                <Typography variant='h6'>
                                    Order 2232 | 5 Medications | Today, 12:30PM
                                </Typography>
                            </Box>
                            <Box w={2 / 10} > <PanelControls {...this.props} /> </Box>
                        </Flex>
                        <Flex>
                            <MedicationList />
                        </Flex>
                    </Box>
                    <Box w={3 / 10} > <SidePanel {...this.props} /></Box>
                </Flex>
            </Container>
        )
    }
}

const Container = styled(Paper)`
  width:100%;
`