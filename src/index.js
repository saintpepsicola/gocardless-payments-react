import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './configureStore'
import AppRoutes from './routes'
import * as serviceWorker from './serviceWorker'
import './index.css'

const rootElement = <Provider store={configureStore()}>
    <AppRoutes />
</Provider>

ReactDOM.render(rootElement, document.getElementById('root'))
serviceWorker.unregister()
