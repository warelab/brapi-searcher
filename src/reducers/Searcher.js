import {
  REQUEST_SUGGESTIONS,
  RECEIVE_SUGGESTIONS
} from '../actions/Searcher'

function searcher(
  state = {
    isFetching: false,
    suggestions: {}
  },
  action
) {
  switch(action.type) {
    case REQUEST_SUGGESTIONS:
      return Object.assign({}, state, {
        isFetching: true
      });
    case RECEIVE_SUGGESTIONS:
      return Object.assign({}, state, {
        isFetching: false,
        suggestions: action.suggestions
      });
    default:
      return state
  }
}

export default searcher;