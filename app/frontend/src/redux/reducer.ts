import { combineReducers } from 'redux'
import clientsReducer from './features/clientsReducer'

const rootReducer = combineReducers({
    // Define a top-level state field named `todos`, handled by `todosReducer`
    clients: clientsReducer,
})

export default rootReducer
