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
import ConfirmDialog from '../../ConfirmDialog/ConfirmDialog'

export default class MedicationList extends React.Component {

    state = {
        showConfirmModal: false
    }

    handleConfirm() {
        const { repeat } = this.props;
        const { confirmMedication } = this.state;
        this.props.toggleMedication(repeat.pod_id, repeat.repeat_id, confirmMedication)
        this.setState({
            showConfirmModal: false,
            confirmMedication: null
        });
    }

    handleClose() {
        this.setState({ showConfirmModal: false });
    }

    handleToggle(podID, repeat, remedy) {
        if (remedy.approved) {
            this.setState({
                showConfirmModal: true,
                confirmMedication: remedy
            });
        }
        else {
            this.props.toggleMedication(podID, repeat.repeat_id, remedy)
        }
    }

    render() {
        const { basic, repeat } = this.props
        const meds = repeat.remedies
        let controlled = false;
        return (
            <Container basic={basic ? 1 : 0}>
                <ConfirmDialog
                    open={this.state.showConfirmModal}
                    handleClose={this.handleClose.bind(this)}
                    handleConfirm={this.handleConfirm.bind(this)}
                    aria-labelledby="form-dialog-title"
                    title='You have rejected a repeat item from the order'
                    contentText='Please leave a note to the patient about your decision'
                    {...this.props}
                />
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