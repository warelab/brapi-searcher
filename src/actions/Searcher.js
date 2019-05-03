export const REQUEST_SUGGESTIONS = 'REQUEST_SUGGESTIONS';
function requestSuggestions(queryString, url) {
  return {
    type: REQUEST_SUGGESTIONS,
    queryString,
    url
  }
}

export const RECEIVE_SUGGESTIONS = 'RECEIVE_SUGGESTIONS';
function receiveSuggestions(suggestions) {
  return {
    type: RECEIVE_SUGGESTIONS,
    suggestions
  }
}

const shouldFetchSuggestions = (state) => {
  return !state.isFetching;
};

const fetchSuggestions = (queryString, url) => {
  return dispatch => {
    dispatch(requestSuggestions(queryString, url));
    return fetch(url)
      .then(response => response.json())
      .then(json => dispatch(receiveSuggestions(json)))
  }
};

const suggestURL = (queryString, state) => {
  return `${state.api}?q=${queryString}*`;
};

export const fetchSuggestionsIfNeeded = queryString => {
  return (dispatch, getState) => {
    const state = getState();
    const url = suggestURL(queryString, state.searcher);
    if (shouldFetchSuggestions(state.searcher)) {
      return dispatch(fetchSuggestions(queryString, url))
    }
  }
};

