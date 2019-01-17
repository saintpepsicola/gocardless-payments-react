import React from 'react'
import { Flex } from 'reflexbox'
import styled from 'styled-components'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import DoneIcon from '@material-ui/icons/CheckCircleOutlined'
import controlledIcon from '../../../resources/controlled_med@1x.svg'
import ConfirmDialog from '../../ConfirmDialog/ConfirmDialog'
import CloseIcon from '@material-ui/icons/Close'

export default class MedicationList extends React.Component {

    state = { showConfirmModal: false }

    handleConfirm() {
        const { repeat } = this.props
        const { confirmMedication } = this.state
        this.props.toggleMedication(repeat.pod_id, repeat.repeat_id, confirmMedication)
        this.setState({
            showConfirmModal: false,
            confirmMedication: null
        })
    }

    handleClose() { this.setState({ showConfirmModal: false }) }

    handleToggle(podID, repeat, remedy) {
        remedy.approved ? this.setState({ showConfirmModal: true, confirmMedication: remedy }) : this.props.toggleMedication(podID, repeat.repeat_id, remedy)
    }

    render() {
        let { basic, repeat } = this.props
        let meds = basic ? repeat.previous_order ? repeat.previous_order.remedies : [] : repeat.remedies
        let controlled = false
        return (
            <Container basic={basic ? 1 : 0}>
                <ConfirmDialog
                    open={this.state.showConfirmModal}
                    handleClose={this.handleClose.bind(this)}
                    handleConfirm={this.handleConfirm.bind(this)}
                    aria-labelledby='form-dialog-title'
                    medication={this.state.confirmMedication}
                    title='You have rejected a repeat item from the order'
                    contentText='Please leave a note to the patient about your decision'
                    {...this.props}
                />
                {repeat && repeat.remedies && <List component="nav">
                    {meds.map((medication, i) => {
                        if (medication.medicine) { controlled = medication.medicine.controlled }
                        return (
                            <Medicine onClick={basic || repeat.gp_status !== 'delivered' ? () => { } : this.handleToggle.bind(this, repeat.pod_id, repeat, medication)} key={i} divider >
                                <MedicineItem controlled={controlled ? 1 : 0} primary={`${i + 1}. ${medication.medicine_name}`} />
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
padding-top:${props => props.basic ? 0 : '8px'};
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
font-family: Assistant;
font-size: 15px;
font-weight: 600;
}

&:hover
{
background-color:#ededed;
cursor:pointer;
}
}
`

const CheckIcon = styled(DoneIcon)`
&&{
font-size:25px;
color:#419646;
}
`

const UncheckIcon = styled(CloseIcon)`
&&{
color:#fff;
width: 25px;
height: 25px;
border-radius:50%;
background-color: #d0021b;
padding: 5px;
box-sizing: border-box;
}
`