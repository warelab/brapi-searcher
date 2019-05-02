import searcherReducer from './Searcher'
import brapiReducer from './Brapi'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  searcher: searcherReducer,
  brapi: brapiReducer
});

export default rootReducer;