import React from 'react'
import { Flex } from 'reflexbox'
import styled from 'styled-components'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import DoneIcon from '@material-ui/icons/DoneAllOutlined'

const medications = ['29 Vitamins C', '21 Vitamins D', '28 Lipitor 200mg', '29 Vitamins C', '21 Vitamins D']

export default class MedicationList extends React.Component {
    render() {
        return (
            <Container>
                <List component="nav">
                    {medications.map((medication, i) => {
                        return (
                            <ListItem key={i} divider >
                                <ListItemText primary={`${i + 1}. ${medication}`} />
                                <ListItemIcon>
                                    <CheckIcon />
                                </ListItemIcon>
                            </ListItem>
                        )
                    })}
                </List>
            </Container>
        )
    }
}

const Container = styled(Flex)`
  width:100%;
    &>nav
    {
        width:100%;
    }
`

const CheckIcon = styled(DoneIcon)`
  color:green;
`