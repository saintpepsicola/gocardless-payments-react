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

    handleToggle(podID, repeat, remedy) {
        if (remedy.approved) {
            let confirm = window.prompt('Please leave a note to the patient about your decision')
            // Send Note
            if (confirm.trim() !== '')
                this.props.sendNote(repeat.repeat_id, confirm)
        }
        this.props.toggleMedication(podID, repeat.repeat_id, remedy)
    }

    render() {
        let { basic, repeat } = this.props
        let meds = repeat.remedies
        let controlled = false
        return (
            <Container basic={basic ? 1 : 0}>
                {repeat && repeat.remedies && <List component="nav">
                    {meds.map((medication, i) => {
                        if (medication.medicine) {
                            controlled = medication.medicine.controlled
                        }
                        return (
                            <Medicine onClick={basic ? () => { } : this.handleToggle.bind(this, repeat.pod_id, repeat, medication)} key={i} divider >
                                <MedicineItem controlled={controlled ? 1 : 0} primary={`${i + 1}. ${medication.medicine_name}`} />
                                {
                                    !basic &&
                                    <ListItemIcon>
                                        {medication.approved ? <CheckIcon /> : <UncheckIcon />}
                                    </ListItemIcon>
                                }
                            </Medicine>
                        )
                    })}
                </List>}
            </Container >
        )
    }
}

const MedicineItem = styled(ListItemText)`
  &::after
  {
    content: '';
    width: 21px;
    height: 21px;
    bottom: -4px;
    position: relative;
    display:${props => props.controlled ? 'inline-block' : 'none'};
    margin-left: 8px;
    background-image: url(${controlledIcon});
    background-repeat: no-repeat;
    background-position: center;
  }
`

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
    span
    {
        display:inline-block;
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