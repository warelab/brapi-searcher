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
        isFetching: true,
        queryString: action.queryString
      });
    case RECEIVE_SUGGESTIONS:
      return Object.assign({}, state, {
        isFetching: false,
        qtime: `${action.suggestions.responseHeader.QTime} ms`,
        matches: action.suggestions.grouped.entity.matches,
        groups: action.suggestions.grouped.entity.groups.map(g => [g.groupValue,g.doclist.numFound]),
        suggestions: action.suggestions.grouped.entity.groups
      });
    default:
      return state
  }
}

export default searcher;