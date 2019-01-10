import React from 'react'
import styled from 'styled-components'
import NotesIcon from '../../../resources/notes-icon.svg'
import PreviousOrderIcon from '../../../resources/previous-order-icon.svg'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

export default class PanelControls extends React.Component {
    state = { value: 0 }

    showPanel(e, id) {
        this.setState({ value: id })
        this.props.selectPanel(id + 1)
    }

    render() {
        let { repeat: { gp_status } } = this.props
        let completedOrder = this.props.repeat ? this.props.repeat.gp_status === 'delivered' ? true : false : false
        return (
            <div>
                {completedOrder && <Ordertabs
                    value={this.state.value}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={this.showPanel.bind(this)}>
                    <Ordertab backicon={NotesIcon} label="Notes" />
                    <Ordertab backicon={PreviousOrderIcon} label="Previous Order" />
                </Ordertabs>}
                {gp_status !== 'delivered' && <OrderStatus status={gp_status} />}
            </div >
        )
    }
}

const OrderStatus = props => {
    return <Status status={props.status === 'accepted'}>{props.status === 'accepted' ? 'Completed' : 'Declined'}</Status>
}

const Ordertabs = styled(Tabs)`
&& span[class^="MuiPrivateTabIndicator"]
{
background-color:#2f84b0;
}
`

const Ordertab = styled(Tab)`
&&
{
font-family:Assistant;
font-size:18px;
color: #575757;
text-transform:none;
}
&& > span > span[class^="MuiTab-labelContainer"]
{
padding:9px;
display: flex;
align-items: center;
justify-content: center;
color:${props => props.selected ? '#2f84b0' : '#575757'};
}
&& > span > span:before
{
mask-size: cover;
background-color: ${props => props.selected ? '#2f84b0' : '#575757'};
mask:url(${props => props.backicon}) no-repeat 50% 50%;
content:"";
padding:6px;
width:20px;
height:20px;
}
`
const Status = styled.p`
&&
{
font-size: 17px;
font-weight:600;
text-align:right;
color:${props => props.status ? '#417505' : 'red'};
padding-right:32px;
}
`