import searcherReducer from './Searcher'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  searcher: searcherReducer
});

export default rootReducer;