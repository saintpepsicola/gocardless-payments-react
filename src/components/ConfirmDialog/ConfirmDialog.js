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
        <DialogContent>
          <ConfirmContentText>
            {this.props.contentText}
          </ConfirmContentText>
          <CommentField
            hideSendButton
            handleChange={this.handleChange.bind(this)}
          />
        </DialogContent>
        <DialogActions>
          <Flex w={1} justify='space-between' align='center'>
            <Box>
              <ConfirmButton label='Cancel' variant='extendedFab' onClick={this.handleClose.bind(this)} color="primary">
                Cancel
                      </ConfirmButton>
            </Box>
            <Box>
              <ConfirmButton
                variant='extendedFab'
                onClick={this.handleConfirm.bind(this)}
                color="primary"
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
  & .paper {
    padding: 0px 15px 15px 15px !important;
  }
`

const ConfirmTitle = styled(DialogTitle)`
  & h2 {
    font-size: 18px;
    font-weight: 900;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    color: #4a4a4a;
    border-bottom: 1px solid #e5e5e5;
    padding-bottom: 15px;
  }
`

const ConfirmContentText = styled(DialogContentText)`
  font-size: 18px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #282828;
  padding-bottom: 15px !important;
`

const ConfirmButton = styled(Button)`
&&
{
    margin-top:16px;
    background-color: ${props => props.label === 'Cancel' ? '#939393' : '#509500'};
    font-size: 14px;
    font-weight: normal;
    color: #fff;
    height: 40px;
}  
`