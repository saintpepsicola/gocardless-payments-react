import React from 'react'
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

export default class Comments extends React.Component {

    state = { showTextarea: false }

    componentDidMount() {
        // Get Comments
        let repeatID = this.props.repeat.repeat_id

        if (this.props.getNotes) {
            this.props.getNotes(repeatID)
        }
    }

    handleClick() {
        this.setState({ showTextarea: true })
    }

    handleChange(e) {
        this.setState({ podMessage: e.target.value.trim() })
    }

    handleReply() {
        let repeatID = this.props.repeat.repeat_id
        this.props.sendNote(repeatID, this.state.podMessage)
    }

    render() {

        let { comments, authorID } = this.props

        return (
            <CommentBox>
                <div>
                    <Title>COMMENTS</Title>
                    {comments && comments.map((comment, i) => <Comment key={i} patient={comment.author_id === authorID ? false : true}>
                        <p>{comment.comment}</p>
                    </Comment>)}

                    {!this.state.showTextarea && <CommentButton onClick={this.handleClick.bind(this)}>REPLY</CommentButton>}

                    {this.state.showTextarea && <ReplyField
                        autoFocus
                        multiline
                        fullWidth
                        value={this.state.name}
                        onChange={this.handleChange.bind(this)}
                        margin="normal"
                        variant="outlined"
                    />}

                    {this.state.showTextarea && <ReplyBtn onClick={this.handleReply.bind(this)} color="primary" variant="extendedFab" aria-label="Process" >
                        REPLY
                    </ReplyBtn>}

                </div>
            </CommentBox>
        )
    }
}

const ReplyField = styled(TextField)`
&&& 
{
    & fieldset
    {
        border-color:#0091cc;
    }
}
`

const ReplyBtn = styled(Button)`
&&
{
    margin-top:16px;
    background-color:#0D6F67;
    font-size: 14px;
    font-weight: normal;
    color: #fff;
    height: 40px;
}  

`

const CommentBox = styled.div`
&&& {
font-size: 14px;
font-weight: 400;
color: #4a4a4a;
white-space:pre-line;
max-width:100%;
line-height:1.5;

    & > div
    {
        overflow-y:auto;
        height:480px;
    }

    & > div::-webkit-scrollbar {
        width:3px;
        background-color: #eeeeee;
    }

    &> div::-webkit-scrollbar-thumb {
        background-color: #3d3d3d;
        border-radius:5px;
    } 
}
`

const Comment = styled.div`
border-left: 2px solid red;
border-color: ${props => props.patient ? '#419645' : '#0091cc'};
padding-left:10px;
`

const CommentButton = styled.div`
margin-top:24px;
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