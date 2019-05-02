import React from 'react'
import { connect } from 'react-redux'
import { fetchSuggestionsIfNeeded } from "../actions/Searcher";
import { bindActionCreators } from "redux";

const SearcherCmp = (props) => (
  <div>
    <input type="search" placeholder="type to search..." onChange={e => props.fetchSuggestionsIfNeeded(e.target.value)}/>
    <div><pre>{JSON.stringify(props, null, 2)}</pre></div>
  </div>
);

const mapState = state => state.searcher;
const mapDispatch = dispatch => bindActionCreators({ fetchSuggestionsIfNeeded }, dispatch);

export const Searcher = connect(mapState, mapDispatch)(SearcherCmp);
