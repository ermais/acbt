import {createStore,applyMiddleware} from 'redux'
import ThunkMiddleware from 'redux-thunk'
import {createLogger} from 'redux-logger'

let middlewareLogger = createLogger()

import {reducer} from './reducer'

const Store = createStore(reducer,applyMiddleware(middlewareLogger,ThunkMiddleware))

export default Store;