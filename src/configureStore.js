import { createStore, applyMiddleware } from 'redux'
import axios from 'axios'
import axiosMiddleware from 'redux-axios-middleware'
import rootReducer from './redux'

const client = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    responseType: 'json'
})

export default function configureStore() {
    return createStore(
        rootReducer,
        applyMiddleware(
            axiosMiddleware(client)
        )
    )
}