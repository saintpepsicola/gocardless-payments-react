import React from 'react'
// import styled from 'styled-components'
import CommentIcon from '@material-ui/icons/Comment'
import RefreshIcon from '@material-ui/icons/RefreshOutlined'
import AddIcon from '@material-ui/icons/AddCircleOutlined'
import IconButton from '@material-ui/core/IconButton'

export default class PanelControls extends React.Component {
    showPanel(id) {
        this.props.selectPanel(id)
    }

    render() {
        return (
            <span>
                <IconButton onClick={this.showPanel.bind(this, 1)} aria-label="Comments">
                    <CommentIcon />
                </IconButton>
                <IconButton onClick={this.showPanel.bind(this, 2)} aria-label="Add">
                    <AddIcon />
                </IconButton>
                <IconButton onClick={this.showPanel.bind(this, 3)} aria-label="Refresh">
                    <RefreshIcon />
                </IconButton>
            </span>
        )
    }
}


