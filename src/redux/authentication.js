// import React, { Component } from 'react'
import Cookies from 'universal-cookie'
import jwt_decode from 'jwt-decode'

// Initial State
const initialState = {
    authenticated: false,
    error: null
}

// Action constants
const AUTHENTICATE_USER = 'AUTHENTICATE_USER'
const IS_AUTHENTICATED = 'IS_AUTHENTICATED'

// Action creators
export const isAuthenticated = () => ({ type: IS_AUTHENTICATED })

// Reducer
export default (state = initialState, action) => {
    switch (action.type) {
        case IS_AUTHENTICATED:
            console.log('Checking auth')
            const cookies = new Cookies()
            const token = cookies.get('podToken-189247ca-76de-45c8-8d29-de3f4d8ff360')
            console.log(token)
            return {
                ...state,
                authenticated: token ? true : false,
                token: token
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

// Helpers
