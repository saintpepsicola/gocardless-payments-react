// import React, { Component } from 'react'
import Cookies from 'universal-cookie'
// import jwt_decode from 'jwt-decode'

// Initial State
const initialState = {
    authenticated: true,
    error: null
}

// Action constants

const IS_AUTHENTICATED = 'IS_AUTHENTICATED'
const REDIRECT_TO_AUTH = 'REDIRECT_TO_AUTH'
const AUTHENTICATE_USER = 'AUTHENTICATE_USER'

// Action creators
export const isAuthenticated = () => ({ type: IS_AUTHENTICATED })
export const redirectToAuth = () => ({ type: REDIRECT_TO_AUTH })

// Reducer
export default (state = initialState, action) => {
    switch (action.type) {
        case IS_AUTHENTICATED:
            console.log('Checking auth')
            const cookies = new Cookies()
            const token = cookies.get('podToken-189247ca-76de-45c8-8d29-de3f4d8ff360')
            console.log('TOKEN: ', token)
            return {
                ...state,
                authenticated: token ? true : false,
                token: token
            }
        case REDIRECT_TO_AUTH:
            console.log('Redirecting for auth')
            const url = `${process.env.REACT_APP_AUTH_URL}/login?client_id=${process.env.REACT_APP_CLIENT_ID}`
            window.location = url
            return {
                ...state
            }
        case AUTHENTICATE_USER:
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
            return {
                ...state,
                isFetching: true,
                repos: [],
                error: null
            }
        default:
            return state
    }
}
