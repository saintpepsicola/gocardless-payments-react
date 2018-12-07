import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './configureStore'
import Routes from './components/Routes/RoutesContainer'
import * as serviceWorker from './serviceWorker'
import 'typeface-roboto'
import './index.css'

const rootElement = <Provider store={store()}>
    <Routes />
</Provider>

ReactDOM.render(rootElement, document.getElementById('root'))
serviceWorker.unregister()
