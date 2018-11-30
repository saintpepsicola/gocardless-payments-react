import React from 'react'
import styled from 'styled-components'
import CommentIcon from '@material-ui/icons/Comment'
import RefreshIcon from '@material-ui/icons/Undo'
import Button from '@material-ui/core/Button';
// import SurgeryIcon from '@material-ui/icons/Contacts'
// import IconButton from '@material-ui/core/IconButton'

export default class PanelControls extends React.Component {
    showPanel(id) {
        this.props.selectPanel(id)
    }

    render() {
        let { panels } = this.props
        return (
            <span>
                <PanelButton iconcolor={panels[0]} onClick={this.showPanel.bind(this, 1)} aria-label="Comments">
                    <CommentIcon /> Notes
                </PanelButton>
                <PanelButton iconcolor={panels[1]} onClick={this.showPanel.bind(this, 2)} aria-label="Refresh">
                    <RefreshIcon /> Previous Order
                </PanelButton>
            </span >
        )
    }
}

const PanelButton = styled(Button)`
    &&
    {   
        color:${props => props.iconcolor.show ? '#2f84b0' : '#595959'};
        text-transform: none;
        font-weight: normal;
    
        & svg
        {
            padding-right: 5px;
        }
    }
`