import React, { Component } from 'react'
import styled from 'styled-components'
import Select from '@material-ui/core/Select'
import ReactSelect from 'react-select'
import MenuItem from '@material-ui/core/MenuItem'

export default class RepeatsFilter extends Component {

    state = { value: 0, surgeries: [] }

    async componentDidMount() {
        //Load surgery options
        await this.props.getSurgeries()
        if (this.props.surgeries) {
            this.setState({
                surgeries: this.props.surgeries.map(surgery => ({
                    value: surgery,
                    label: surgery.surgery_name,
                }))
            })
        }
    }

    async handleChange(e) {
        this.setState({ value: e })
        let arr = []
        arr.push(e.value.surgery_id)
        let filter = `filter={"surgeries":${JSON.stringify(arr)}}`
        await this.props.setSurgeryFilter(filter)
        this.props.getRepeats(true)
    }

    render() {
        return (
            <div>

                <Selector disableUnderline disabled value={0}>
                    <MenuItem value={0}>GP/Surgery</MenuItem>
                </Selector>
                <Autocomplete
                    value={this.state.value}
                    onChange={this.handleChange.bind(this)}
                    options={this.state.surgeries}
                />
            </div>)
    }
}

const Autocomplete = styled(ReactSelect)`
&& {
margin: 12px 8px 0 0;
height: 43px;
border-radius: 13px;
box-shadow: 0 1px 2px 0 rgba(80,80,80,0.2);
background-color: #ffffff;
font-size: 16px;
padding: 0 12px;
color: #257195;
width: 400px;
display: inline-block;
}
&& > div {
border:0;
margin-top:1px;
box-shadow:none;
}
`

const Selector = styled(Select)`
&& {
margin: 12px 8px 0 0;
height: 44px;
border-radius: 13px;
box-shadow: 0 1px 2px 0 rgba(80, 80, 80, 0.2);
background-color: #ffffff;
font-size: 16px;
padding:0 12px;
color: #257195;
}
`