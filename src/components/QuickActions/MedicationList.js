import React from 'react'
import { Flex } from 'reflexbox'
import styled from 'styled-components'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import DoneIcon from '@material-ui/icons/DoneAllOutlined'

export default class MedicationList extends React.Component {

    state = {
        medications: [
            { name: '29 Vitamins C' },
            { name: '21 Vitamins D' },
            { name: '28 Lipitor 200mg' },
            { name: '29 Vitamins C' },
            { name: '21 Vitamins D' }]
    }

    handleToggle(value, i) {
        let { medications } = this.state
        medications[i].value = value ? false : true;
        this.setState({ medications: medications })
    }

    render() {
        return (
            <Container>
                <List component="nav">
                    {this.state.medications.map((medication, i) => {
                        return (
                            <ListItem onClick={this.props.basic ? () => { } : this.handleToggle.bind(this, medication.value, i)} key={i} divider >
                                <ListItemText primary={`${i + 1}. ${medication.name}`} />
                                {medication.value && <ListItemIcon>
                                    <CheckIcon />
                                </ListItemIcon>}
                            </ListItem>
                        )
                    })}
                </List>
            </Container >
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