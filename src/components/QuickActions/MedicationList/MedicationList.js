import React from 'react'
import { Flex } from 'reflexbox'
import styled from 'styled-components'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import DoneIcon from '@material-ui/icons/CheckCircleOutlined'
import OffIcon from '@material-ui/icons/HighlightOff'
import controlledIcon from '../../../resources/controlled_med@1x.svg'

export default class MedicationList extends React.Component {

    handleToggle(podID, repeatID, remedy) {
        let confirm = window.confirm('Please leave a note to the patient about your decision')
        if (confirm) {
            this.props.toggleMedication(podID, repeatID, remedy)
        }

        // if (remedy.approved) {
        //     console.log(prompt, this.props)
        //     this.props.sendNote(repeatID, prompt)
        // }
    }

    render() {
        let { basic, repeat } = this.props
        let meds = repeat.remedies
        let controlled = false;
        return (
            <Container basic={basic ? 1 : 0}>
                {repeat && repeat.remedies && <List component="nav">
                    {meds.map((medication, i) => {
                        if (medication.medicine) {
                            controlled = medication.medicine.controlled
                        }
                        return (
                            <Medicine onClick={basic ? () => { } : this.handleToggle.bind(this, repeat.pod_id, repeat.repeat_id, medication)} key={i} divider >
                                <ListItemText primary={`${i + 1}. ${medication.medicine_name}` } />
                                {controlled ? <img alt='controlled medicine' src={controlledIcon} /> : ''}
                                {!basic &&
                                    <ListItemIcon>
                                        {medication.approved ? <CheckIcon /> : <UncheckIcon />}
                                    </ListItemIcon>}
                            </Medicine>
                        )
                    })}         
                </List>}
            </Container >
        )
    }
}

const Container = styled(Flex)`
    width:100%;
    &>nav
    {
        width:100%;
        height:360px;
        overflow-y:auto;
        padding-right:30px;
    }

    & nav::-webkit-scrollbar {
        width:3px;
        background-color: #eeeeee;
    }

    & nav::-webkit-scrollbar-thumb {
        background-color: #3d3d3d;
        border-radius:5px;
    } 
    
    & span
    {
       font-weight:${props => props.basic ? '400' : '600'};
       color:#282828;
    }
`
const Medicine = styled(ListItem)`
&&
{
    padding-right:0;
    svg
    {
        
    }

    &:hover
    {
        background-color:#ededed;
        cursor:pointer;
    }
}
`

const CheckIcon = styled(DoneIcon)`
  color:#0D6F67;
`

const UncheckIcon = styled(OffIcon)`
  color:#b71c1c;
`