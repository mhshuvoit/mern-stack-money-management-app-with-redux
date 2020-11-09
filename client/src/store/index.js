import { createStore, compose, applyMiddleware } from 'redux'
import rootReducer from './reducers/rootReducer'
import thunk from 'redux-thunk' // we are using redux thunk for ajax asynchonous and redux synchronous handling.

const middleware = [thunk]

const store = createStore(rootReducer, compose( // It is compose maney types of inhancer
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))

export default store