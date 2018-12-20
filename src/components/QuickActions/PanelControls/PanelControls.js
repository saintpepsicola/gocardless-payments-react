import React from 'react'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import notesIcon from '../../../resources/notes-icon.svg'
import previousOrderIcon from '../../../resources/previous-order-icon.svg'

export default class PanelControls extends React.Component {
    showPanel(id) { this.props.selectPanel(id) }

    render() {
        let { panels, repeat: { gp_status } } = this.props
        return (
            <div>
                {gp_status !== 'delivered' && <OrderStatus status={gp_status} />}
                {gp_status === 'delivered' &&
                    <span>
                        <PanelButton iconcolor={panels[0]} onClick={this.showPanel.bind(this, 1)} aria-label="Comments">
                            <PanelIcon iconcolor={panels[1]} src={notesIcon} /> Notes
                        </PanelButton>
                        <PanelButton iconcolor={panels[1]} onClick={this.showPanel.bind(this, 2)} aria-label="Refresh">
                            <PanelIcon iconcolor={panels[1]} src={previousOrderIcon} /> Previous Order
                        </PanelButton>
                    </span>}
            </div>
        )
    }
}

const OrderStatus = props => {
    return <Status status={props.status === 'accepted'}>{props.status === 'accepted' ? 'Completed' : 'Declined'}</Status>
}

const Status = styled.p`
&&
{    
font-size: 17px;
font-weight: 600;
text-align: right;
color:${props => props.status ? '#417505' : 'red'};
padding-right: 32px;
}
`

const PanelButton = styled(Button)`
&&
{
color: ${ props => props.iconcolor.show ? '#2f84b0' : '#595959'};
text-transform: capitalize;
font-weight: normal;
padding-top: 14px;
}
`

const PanelIcon = styled.img`
&&
{
padding-right: 5px;
}
`