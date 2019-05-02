import React from 'react'
import { Provider } from 'react-redux'
import { Searcher } from './components/Searcher'
import configureStore from './store/configureStore'
import initializeState from './store/initialState'
import { fetchSuggestionsIfNeeded } from "./actions/Searcher";

const BrAPISearcher = (props) => {
  const store = configureStore(initializeState(props));
  store.dispatch(fetchSuggestionsIfNeeded(''));
  return (
    <Provider store={store}>
      <Searcher/>
    </Provider>
  )
};

export default BrAPISearcher
