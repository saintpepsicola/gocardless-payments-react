import React from 'react'
import styled from 'styled-components'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'

class OrderHistory extends React.Component {

    componentDidMount() {
        // console.log(this.props)
    }

    render() {
        let { repeat } = this.props
        console.log(repeat);
        

        return (
            <h1>ORDER HISTORY</h1>
        )
    }
}

export default OrderHistory