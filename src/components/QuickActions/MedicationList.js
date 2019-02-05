import React from 'react'
import { Flex } from 'reflexbox'
import styled from 'styled-components'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import controlledIcon from '../../resources/controlled_med@1x.svg'
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog'
import CheckedIconImage from '../../resources/checked.png'
import CheckedIconImageHistory from '../../resources/checkedHistory.png'
import UnCheckedIconImage from '../../resources/reject.png'
import UnCheckedIconImageHistory from '../../resources/rejectHistory.png'

export default class MedicationList extends React.Component {

    state = { showConfirmModal: false, index: null, remedies: [] }

    componentDidMount() {
        this.props.saveMedications(this.props.repeat.remedies)
    }

    handleConfirm(rejectionReason) {
        const { remedies, index } = this.state
        remedies[index].rejectionReason = rejectionReason
        this.updateRemedies(remedies, index)
        this.setState({ showConfirmModal: false, confirmMedication: null })
    }

    updateRemedies(remedies, index) {
        if (index >= 0)
            remedies[index].approved = !remedies[index].approved
        this.forceUpdate()
        let updatedRemedies = remedies.map(remedy => {
            return {
                remedy_id: remedy.remedy_id,
                approved: remedy.approved,
                medicine_name: remedy.medicine_name,
                comment: !remedy.approved ? remedy.rejectionReason : null
            }
        })
        this.props.saveMedications(updatedRemedies)
    }

    handleToggle(index, remedies) {
        this.setState({
            showConfirmModal: remedies[index].approved ? true : false,
            remedies: remedies,
            index: index
        })

        if (!remedies[index].approved)
            this.updateRemedies(remedies, index)
    }

    handlePendingToggle(index, med, allmeds) {

        if (window.confirm("Do you really want to approve this?")) {
            med.approved = true
            this.forceUpdate()
            this.props.saveMedications(allmeds)
        }
    }

    handleClose() { this.setState({ showConfirmModal: false }) }

    render() {
        let { basic, repeat, withinGracePeriod } = this.props
        let meds = basic ? repeat.previous_order ? repeat.previous_order.remedies : [] : repeat.remedies
        let controlled = false
        let approvedMeds = meds.filter(medication => medication.approved)
        let rejectedMeds = meds.filter(medication => !medication.approved)
        let medicationInteraction = (!basic && (repeat.gp_status === 'delivered'))
        return (
            <Container basic={basic ? 1 : 0}>
                <ConfirmDialog
                    open={this.state.showConfirmModal}
                    handleClose={this.handleClose.bind(this)}
                    handleConfirm={this.handleConfirm.bind(this)}
                    aria-labelledby='form-dialog-title'
                    medication={this.state.remedies[this.state.index]}
                    title='You have rejected a repeat item from the order'
                    contentText='Please leave a note to the patient about your decision'
                    {...this.props} />

                {repeat && repeat.remedies && !withinGracePeriod && <List component="nav">
                    {meds.map((medication, i) => {
                        if (medication.medicine) { controlled = medication.medicine.controlled }
                        return (
                            <Medicine onClick={medicationInteraction ? this.handleToggle.bind(this, i, meds) : () => { }} key={i} divider >
                                <MedicineItem secondary={!medication.approved ? medication.rejectionReason : ''} controlled={controlled ? 1 : 0} primary={`${i + 1}. ${medication.medicine_name}`} />
                                {!basic &&
                                    <ListItemIcon>
                                        {medication.approved ? <CheckIcon muted={this.props.completed} /> : <UncheckIcon muted={this.props.completed} />}
                                    </ListItemIcon>}
                            </Medicine>)
                    })}
                </List>}

                {/* GRACE PERIOD LIST */}
                {repeat && repeat.remedies && withinGracePeriod && <List component="nav">
                    {/* APPROVED MEDICATIONS */}
                    {approvedMeds.length !== 0 && <SubTitle>Ordered</SubTitle>}
                    {approvedMeds.map((medication, i) => {
                        if (medication.medicine) { controlled = medication.medicine.controlled }
                        return (
                            <Medicine key={i} divider >
                                <MedicineItem controlled={controlled ? 1 : 0} primary={`${i + 1}. ${medication.medicine_name}`} />
                                {!basic &&
                                    <ListItemIcon>
                                        <CheckIcon muted />
                                    </ListItemIcon>}
                            </Medicine>)
                    })}
                    {/* REJECTED MEDICATIONS */}
                    {rejectedMeds.length !== 0 && <SubTitle>Pending</SubTitle>}
                    {rejectedMeds.map((medication, i) => {
                        if (medication.medicine) { controlled = medication.medicine.controlled }
                        return (<Medicine onClick={this.handlePendingToggle.bind(this, i, medication, meds)} key={i} divider >
                            <MedicineItem controlled={controlled ? 1 : 0} primary={`${i + 1}. ${medication.medicine_name}`} />
                            {!basic &&
                                <ListItemIcon>
                                    <UncheckIcon />
                                </ListItemIcon>}
                        </Medicine>)
                    })}
                </List>}
            </Container >)
    }
}

const MedicineItem = styled(ListItemText)`
&& span::after
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
width: 100%;
height:360px;
overflow-y:auto;
padding-top:${props => props.basic ? 0 : '8px'};
}

& nav::-webkit-scrollbar {
width: 3px;
background-color: #eeeeee;
}

& nav::-webkit-scrollbar-thumb {
background-color: #3d3d3d;
border-radius:5px;
}

& span
{
font-weight: ${props => props.basic ? '400' : '600'};
color:#282828;
}
`
const Medicine = styled(ListItem)`
&&
{
padding-right: 0;
span
{
display: inline-block;
font-family: Assistant;
font-size: 15px;
font-weight: 600;
}

&& p
{
padding-left:13px;
}

&:hover
{
background-color: #ededed;
cursor:pointer;
}
}
`

const SubTitle = styled.h3`
&&{
font-family: Assistant;
font-size: 18px;
color:#282828;
margin:22px 0 4px 0px;
}
`

const CheckIcon = styled.div`
&&{
background-image:url(${props => props.muted ? CheckedIconImageHistory : CheckedIconImage}); 
background-size:24px;
height:25px;
width:25px;
background-repeat:no-repeat;
}
`

const UncheckIcon = styled.div`
&&{
width: 25px;
height: 25px;
background-size:24px;
background-repeat:no-repeat;
background-image:url(${props => props.muted ? UnCheckedIconImageHistory : UnCheckedIconImage}); 
}
`