import React from 'react'
import styled from 'styled-components'

export default class Comments extends React.Component {

    render() {
        return (
            <CommentBox>
                <Title>COMMENTS</Title>
                <Comment patient>
                    <p>{`Hello \n\nI will be going on vacation next week and thereby require my meds re-ordered by end of this week. Thanks`}</p>
                </Comment>

                <Comment>
                    {`Dear Stephan,\n\nThank you for your message. How long will you be gone for so we can ensure we order the correct quantity?`}
                </Comment>


                <CommentButton>REPLY</CommentButton>

            </CommentBox>
        )
    }
}

const CommentBox = styled.div`
font-size: 14px;
font-weight: 400;
color: #4a4a4a;
white-space:pre-line;
max-width:100%;
line-height:1.5;
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