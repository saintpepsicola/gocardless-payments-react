import React from 'react';
import styled from 'styled-components';
import { Flex, Box } from 'reflexbox'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import CommentField from '../QuickActions/Comments/CommentField';

export default class ConfirmDialog extends React.Component {

  state = {
    podMessage: null
  }

  handleClose() {
    this.props.handleClose();
  }

  handleConfirm() {
    const { repeat } = this.props;
    this.props.sendNote(repeat.repeat_id, this.state.podMessage);
    this.props.handleConfirm();
  }

  handleChange(e) {
    this.setState({ podMessage: e.target.value.trim() })
  }

  render() {
    return (
      <StyledDialog
        open={this.props.open}
        onClose={this.handleClose.bind(this)}
        aria-labelledby={this.props['aria-labelledby']}
      >
        <ConfirmTitle id="form-dialog-title">{this.props.title}</ConfirmTitle>
        <Content>
          <ConfirmContentText>
            {this.props.contentText}
          </ConfirmContentText>
          <CommentField
            hideSendButton
            handleChange={this.handleChange.bind(this)}
          />
        </Content>
        <DialogActions>
          <Flex w={1} justify='space-between' align='center'>
            <Box>
              <ConfirmButton label='Cancel' onClick={this.handleClose.bind(this)}>
                Cancel
              </ConfirmButton>
            </Box>
            <Box>
              <ConfirmButton
                onClick={this.handleConfirm.bind(this)}
                disabled={!this.state.podMessage}
              >
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
height: 309px;
border-radius: 22.5px;
box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
background-color: #ffffff;
box-sizing: border-box;
}
`

const ConfirmTitle = styled(DialogTitle)`
&&
{
padding:0;
}  

& h2 {
font-size: 18px;
font-weight: 900;
font-style: normal;
font-stretch: normal;
line-height: normal;
letter-spacing: normal;
text-align: center;
color: #4a4a4a;
border-bottom:1px solid #e5e5e5;
padding:0 0 15px 0;
}
`

const Content = styled(DialogContent)`
&&
{
padding:22px 0;
}  
`

const ConfirmContentText = styled(DialogContentText)`
font-size:18px;
font-weight:normal;
font-style:normal;
font-stretch:normal;
line-height:normal;
letter-spacing:normal;
color:#282828;
padding-bottom:15px !important;
`

const ConfirmButton = styled(Button)`
&&
{
margin-top:16px;
background-color: ${props => props.label === 'Cancel' ? '#939393' : '#509500'};
font-size: 14px;
font-weight: normal;
color:#ffffff !important;
height: 40px;
border-radius:25px;
}  
`