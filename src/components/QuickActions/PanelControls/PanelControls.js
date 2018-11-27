import React from 'react'
import styled from 'styled-components'
import CommentIcon from '@material-ui/icons/Comment'
import RefreshIcon from '@material-ui/icons/Undo'
import SurgeryIcon from '@material-ui/icons/Contacts'
import IconButton from '@material-ui/core/IconButton'

export default class PanelControls extends React.Component {
    showPanel(id) {
        this.props.selectPanel(id)
    }

    render() {
        let { panels } = this.props
        return (
            <span>
                <Button iconcolor={panels[0]} onClick={this.showPanel.bind(this, 1)} aria-label="Comments">
                    <CommentIcon />
                </Button>
                <Button iconcolor={panels[1]} onClick={this.showPanel.bind(this, 2)} aria-label="Add">
                    <SurgeryIcon />
                </Button>
                <Button iconcolor={panels[2]} onClick={this.showPanel.bind(this, 3)} aria-label="Refresh">
                    <RefreshIcon />
                </Button>
            </span >
        )
    }
}

const Button = styled(IconButton)`
    & svg
    {
        color:${props => props.iconcolor.show ? '#2f84b0' : '#595959'};
    }   
`