import { combineReducers } from 'redux'
import threads from './threads'
import comments from './comments'

// The approach chosen is to organize the reducer into task-based structure
const rootReducer = combineReducers({
  threads,
  comments,
})

export default rootReducer
