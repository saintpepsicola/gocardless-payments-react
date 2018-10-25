import { createStore, applyMiddleware } from 'redux'
import axios from 'axios'
import axiosMiddleware from 'redux-axios-middleware'
import rootReducer from './redux'

const client = axios.create({
    baseURL: 'https://api.github.com'
})

export default function configureStore() {
    return createStore(
        rootReducer,
        applyMiddleware(
            axiosMiddleware(client)
        )
    )
}