import React from 'react'
import styled from 'styled-components'
import CommentField from './CommentField'
import ScrollToBottom from 'react-scroll-to-bottom'

export default class Comments extends React.Component {

    state = {
        showTextarea: false,
        noCommentsMessage: `You have no notes attached to this order. You can leave notes to the patient regarding their order before processing and completing the order.`
    }

    componentDidMount() {
        // Get Comments
        let repeatID = this.props.repeat.repeat_id
        if (this.props.getNotes) {
            this.props.getNotes(repeatID)
            this.interval = setInterval(() => this.props.getNotes(repeatID), 800)
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    handleChange(e) {
        this.setState({ podMessage: e.target.value.trim() })
    }

    handleReply() {
        let repeatID = this.props.repeat.repeat_id
        this.props.sendNote(repeatID, this.state.podMessage)
    }

    render() {
        const { comments } = this.props
        const { noCommentsMessage, sendingComment, name } = this.state

        return (
            <CommentBox disabled={sendingComment}>
                <ScrollToBottom>
                    <div>
                        <Title>NOTES</Title>
                        {comments && comments.map((comment, i) => <Comment key={i} patient={comment.author_role === 'pod' ? false : true}>
                            <CommentAuthorTime>{comment.comment_updated}</CommentAuthorTime>
                            <p>{comment.comment}</p>
                        </Comment>)}

                        {comments && comments.length === 0 && <NoCommentText>{noCommentsMessage}</NoCommentText>}

                        <CommentField
                            handleChange={this.handleChange.bind(this)}
                            handleReply={this.handleReply.bind(this)}
                            value={name}
                        />

                    </div>
                </ScrollToBottom>
            </CommentBox>
        )
    }
}

const CommentBox = styled.div`
&& {
        font-size: 14px;
        font-weight: 400;
        color: #4a4a4a;
        white-space:pre-line;
        max-width:100%;
        line-height:1.5;

    & > div > div {
        overflow-y:auto;
        height:480px;
    }

    & > div > div::-webkit-scrollbar {
        width:3px;
        background-color: #eeeeee;
    }

    & > div > div::-webkit-scrollbar-thumb {
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

const Title = styled.h1`
    font-size: 18px;
    font-weight: 900;
    color: #4a4a4a;
`

const NoCommentText = styled.p`
    color: #4a4a4a;
`