import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../redux/authentication'

class Authentication extends Component {
    componentDidMount() {
        // Authenticate User
        this.props.authenticate(this.props.location.search, this.props.history)
        // const search = this.props.location.search
        // const cookies = new Cookies()
        // const queryParams = new URLSearchParams(search)
        // const token = queryParams.get('token')
        // console.log('token', token)
        // var expires = new Date(jwt_decode(token).exp * 1000)
        // cookies.set('podToken-189247ca-76de-45c8-8d29-de3f4d8ff360', token, {
        //     path: '/',
        //     expires: expires
        // });
        // this.props.history.push('/')
    }

    render() {
        return <div>< h1 > Authenticating...</h1 ></div >
    }
}

export default connect(null, actions)(Authentication)