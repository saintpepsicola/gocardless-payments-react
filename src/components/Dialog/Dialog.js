import React, { Component } from 'react'
// import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import Dialogbox from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'

export default class Dialog extends Component {

    handleClose = () => {
        this.props.toggleDialog()
    }

    updateRemedy() {
        console.log(this.state)
        //this.props.toggleMedication(medication.repeat_id, medication.remedy_id)
    }

    render() {
        // console.log(this.props)
        let { dialog } = this.props
        return (
            <Dialogbox
                open={dialog}
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Disagree
                </Button>
                    <Button onClick={this.updateRemedy.bind(this)} color="primary" autoFocus>
                        Agree
                 </Button>
                </DialogActions>
            </Dialogbox>
        )
    }
}

// Styled Components
// const Dialogbox2 = styled.div`
// background:rgba(0,0,0,0.45);
// left: 0;
// right: 0;
// top: 0; 
// bottom: 0;
// position:fixed;
// z-index:22;
// box-shadow: inset 0 0 0 3000px rgba(255,255,255,0.3);
// filter:blur(10px);
// `

// const Avatar = styled.div`
//   text-align:left;
// `

// const Image = styled.img`
//     text-align:left;
//     max-height:60px;
//     width:auto;
//     border-radius:50%;
//     box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
// `