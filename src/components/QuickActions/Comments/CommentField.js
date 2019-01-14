import React from 'react'
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

export default class CommentField extends React.Component {

    state = {
        showTextArea: false
    }

    handleClick() {
        this.setState({ showTextarea: true })
    }

    handleChange(e) {
        this.props.handleChange(e)
    }

    handleFocusOut(e) {
        if (!e.target.value) {
            this.setState({ showTextarea: false })
        }
    }

    handleReply() {
        this.props.handleReply()
        this.setState({ showTextarea: false })
    }

    handleCancel() {
        this.setState({ showTextarea: false })
    }

    render() {
        const { hideSendButton, value } = this.props
        const { showTextarea } = this.state

        return (
            <div>
                {!showTextarea && <CommentButton onClick={this.handleClick.bind(this)}>Leave a note</CommentButton>}

                {showTextarea && <ReplyField
                    autoFocus
                    multiline
                    fullWidth
                    value={value}
                    onChange={this.handleChange.bind(this)}
                    onBlur={this.handleFocusOut.bind(this)}
                    margin="normal"
                    variant="outlined"
                    placeholder='Please enter your comment'
                />}

                {!hideSendButton && showTextarea && <ReplyBtn onClick={this.handleReply.bind(this)} color="primary" aria-label="Process" >
                    SEND
        </ReplyBtn>}

                {!hideSendButton && showTextarea && <ReplyBtn onClick={this.handleCancel.bind(this)} color="primary" aria-label="Process" >
                    CANCEL
        </ReplyBtn>}
            </div>
        )
    }

}

const CommentButton = styled.div`
border-left: 2px solid #3c3c3c;
padding-left:10px;
cursor:pointer;
font-family: Assistant;
font-size: 17px;
font-weight: normal;
font-style: normal;
line-height: normal;
color: #3c3c3c;
`

const ReplyField = styled(TextField)`
&& 
{
    margin: 0px;

    & > div
    {
        padding: 10px !important;
    }

    && fieldset
    {
        border-left: 2px solid #0091cc;
        border-right: none;
        border-top: none;
        border-bottom: none;
        border-radius: 0;
        outline: none;
    }

    & textarea
    {
        color: #4a4a4a;
    }
}
`

const ReplyBtn = styled(Button)`
    padding: 0px !important;
    border-radius: 0px !important;
    
    & span {
        color: #2f84b0;
    }
`