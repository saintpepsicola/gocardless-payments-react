import React from 'react'
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

export default class Comments extends React.Component {

    state = {
        showTextarea: false,
        noCommentsMessage: `You have no notes attached to this order. You can leave notes to the patient regarding their order before processing and completing the order.
        
        LEAVE A MESSAGE
        `
    }

    componentDidMount() {
        // Get Comments
        let repeatID = this.props.repeat.repeat_id
        if (this.props.getNotes) {
            this.props.getNotes(repeatID)
            this.interval = setInterval(() => this.props.getNotes(repeatID), 4000)
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    handleClick() {
        this.setState({ showTextarea: true })
    }

    handleFocusOut(e) {
        if(!e.target.value) {
            this.setState({ showTextarea: false })
        }
    }

    handleChange(e) {
        this.setState({ podMessage: e.target.value.trim() })
    }

    handleReply() {
        let repeatID = this.props.repeat.repeat_id
        this.props.sendNote(repeatID, this.state.podMessage)
        this.setState({ showTextarea: false })
    }

    render() {
        const { comments } = this.props
        const { 
            noCommentsMessage,
            sendingComment,
            showTextarea,
            name
        } = this.state

        return (
            <CommentBox disabled={sendingComment}>
                <div>
                    <Title>COMMENTS</Title>
                    {comments && comments.map((comment, i) => <Comment key={i} patient={comment.author_role === 'pod' ? false : true}>
                        <CommentAuthorTime>{comment.comment_updated}</CommentAuthorTime>
                        <p>{comment.comment}</p>
                    </Comment>)}


                    {comments && !showTextarea && comments.length !== 0 && <CommentButton onClick={this.handleClick.bind(this)}>REPLY</CommentButton>}
                    {comments && !showTextarea && comments.length === 0 && <NoCommentButton onClick={this.handleClick.bind(this)}>{noCommentsMessage}</NoCommentButton>}

                    {showTextarea && <ReplyField
                        autoFocus
                        multiline
                        fullWidth
                        value={name}
                        onChange={this.handleChange.bind(this)}
                        onBlur={this.handleFocusOut.bind(this)}
                        margin="normal"
                        variant="outlined"
                        placeholder='Please enter your comment'
                    />}

                    {showTextarea && <ReplyBtn onClick={this.handleReply.bind(this)} color="primary" aria-label="Process" >
                        SEND
                    </ReplyBtn>}

                </div>
            </CommentBox>
        )
    }
}

const ReplyField = styled(TextField)`
&& 
{
    margin: 0px;

    & > div
    {
        padding: 10px !important;
    }

    & fieldset
    {
        border-left: 2px solid #0091cc !important;
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

const CommentBox = styled.div`
&& {
        font-size: 14px;
        font-weight: 400;
        color: #4a4a4a;
        white-space:pre-line;
        max-width:100%;
        line-height:1.5;

    & > div {
        overflow-y:auto;
        height:480px;
    }

    & > div::-webkit-scrollbar {
        width:3px;
        background-color: #eeeeee;
    }

    & > div::-webkit-scrollbar-thumb {
        background-color: #3d3d3d;
        border-radius:5px;
    } 
}
`

const Comment = styled.div`
    border-left: 2px solid red;
    border-color: ${props => props.patient ? '#419645' : '#0091cc'};
    padding-left:10px;
    font-size: 16px;
    font-weight: normal;
`

const CommentAuthorTime = styled.p`
    color: #999;
    font-size: 10px;
`

const CommentButton = styled.div`
    height: 39px;
    line-height: 39px;
    border-left: 2px solid #0091cc;
    padding-left:10px;
    color: #2f84b0;
    cursor:pointer;
`

const NoCommentButton = styled.div`
    border-left: 2px solid #0091cc;
    padding-left:10px;
    color: #2f84b0;
    cursor:pointer;
`

const Title = styled.h1`
    font-size: 18px;
    font-weight: 900;
    color: #4a4a4a;
`