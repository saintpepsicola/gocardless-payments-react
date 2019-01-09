import React from 'react'
import styled from 'styled-components'
import { Flex, Box } from 'reflexbox'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import CommentField from '../QuickActions/Comments/CommentField'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import CloseIcon from '@material-ui/icons/Close'

const automaticReplies = [
  'Incorrect patient details', 'Medication not on your records',
  'No consent for third party to enter your records',
  'Wrong strength or Form of medication.',
  'Item hasn’t been ordered for 6 months',
  'Your repeat order is too early. Please order at least one week before running out.'
]


export default class ConfirmDialog extends React.Component {
  state = { podMessage: null, value: 1 }

  handleClose() {
    this.props.handleClose()
  }

  handleConfirm() {
    const { repeat } = this.props
    this.props.sendNote(repeat.repeat_id, this.state.value === '0' ? this.state.podMessage : automaticReplies[Number(this.state.value) - 1])
    this.props.handleConfirm()
  }

  handleChange(e) {
    this.setState({ podMessage: e.target.value.trim() })
  }

  handleReply = (e) => this.setState({ value: e.target.value })


  render() {
    return (
      <StyledDialog
        open={this.props.open}
        onClose={this.handleClose.bind(this)}
        aria-labelledby={this.props['aria-labelledby']} >

        <ConfirmTitle id="form-dialog-title">{this.props.title}</ConfirmTitle>
        {this.props.medication && <Medicine><UncheckIcon />{this.props.medication.medicine_name}</Medicine>}
        <Content>
          <ConfirmContentText>
            {this.props.contentText}
          </ConfirmContentText>

          {/* Pre defined Messages */}
          <AutomaticReplies
            aria-label="Automatic Replies"
            name="notes"
            value={String(this.state.value)}
            onChange={this.handleReply.bind(this)}>
            {automaticReplies.map((reply, i) =>
              <FormControlLabel key={i + 1} value={String(i + 1)} control={<Radio />} label={reply} />)}
            <FormControlLabel key={0} value={`0`} control={<Radio />} label={`Other (Please Leave a note below)`} />
          </AutomaticReplies>

          {this.state.value === `0` && <CommentField
            hideSendButton
            handleChange={this.handleChange.bind(this)}
          />}

        </Content>
        <DialogActions>
          <Flex justify='space-between' align='center'>
            <Box>
              <ConfirmButton color='secondary' label='Cancel' onClick={this.handleClose.bind(this)}>
                Cancel
              </ConfirmButton>
            </Box>
            <Box>
              <ConfirmButton
                onClick={this.handleConfirm.bind(this)}
                disabled={this.state.value === `0` && !this.state.podMessage} >
                Confirm
              </ConfirmButton>
            </Box>
          </Flex>
        </DialogActions>
      </StyledDialog>
    )
  }

}


const StyledDialog = styled(({ color, ...other }) => (
  <Dialog {...other} classes={{ paper: 'paper' }} />
))`
&& .paper {
padding:22px 22px 8px 22px !important;
width: 483px;
border-radius: 22.5px;
box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
background-color: #ffffff;
box-sizing: border-box;
}
&& .paper div[class^="MuiDialogActions"] {
justify-content:center;
}
&& .paper div[class^="MuiDialogActions-action"] div:first-child button  {
margin-right:25px;
}
`

const AutomaticReplies = styled(RadioGroup)`
&& svg
{
color:black;
}  
`

const ConfirmTitle = styled(DialogTitle)`
&&
{
padding:0;
}  

& h2 {
font-family: Assistant;
font-size: 18px;
font-weight: 800;
font-style: normal;
line-height: normal;
letter-spacing: normal;
text-align: center;
color: #4a4a4a;
border-bottom:1px solid #e5e5e5;
padding:0 0 15px 0;
}
`

const Medicine = styled.p`
&&
{
border-bottom:1px solid #e5e5e5;
display: flex;
padding-bottom: 8px;
margin: 8px 0;
font-family: Assistant;
font-size: 17px;
font-weight: 600;
font-style: normal;
font-stretch: normal;
line-height: normal;
letter-spacing: normal;
color: #4a4a4a;
align-items:center;
} 
&& svg
{
margin-right:12px;
padding: 5px;
}  
`

const UncheckIcon = styled(CloseIcon)`
&&  
{
  color:#fff;
  width: 16px;
  height: 16px;
  border-radius:50%;
  background-color: #d0021b;
}
`

const Content = styled(DialogContent)`
&&
{
padding:18px 0;
}  
`

const ConfirmContentText = styled(DialogContentText)`
&& {
font-family: Assistant;
font-size: 18px;
font-weight: 600;
font-style: normal;
font-stretch: normal;
line-height: normal;
letter-spacing: normal;
color: #282828;
padding-bottom:15px;
}
`

const ConfirmButton = styled(Button)`
&&
{
margin-top:16px;
background-color: ${props => props.label === 'Cancel' ? '#939393' : props.disabled ? '#ededed' : '#509500'};
font-size: 14px;
font-weight: normal;
color:#ffffff !important;
height: 40px;
border-radius:25px;
box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.28);
}  
&&:hover
{
  background-color: ${props => props.label === 'Cancel' ? '#939393' : '#509500'};
  opacity: 0.9;
}
`