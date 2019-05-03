import React from 'react'
import { connect } from 'react-redux'
import { fetchSuggestionsIfNeeded } from "../actions/Searcher";
import { bindActionCreators } from "redux";
import styles from './Searcher.css';

const SuggestionsSearchbar = props => (
  <input type="search" placeholder="type to search..." onChange={e => props.fetchSuggestionsIfNeeded(e.target.value)}/>
);

const SuggestionsSummary = props => (
  <div>
    <span>matches: {props.matches} found in {props.qtime}</span>
    <pre>{JSON.stringify(props.groups)}</pre>
  </div>
);
const PADDING = 20;
const boldify = (text, term, padding) => {
  let result = '';
  let lcText = text.toLowerCase();
  let offset = 0;
  let idx = lcText.indexOf(term);
  while (idx !== -1) {
    if (idx > 2*padding) {
      if (offset > 0) {
        result += text.substr(offset, padding);
      }
      result += '...' + text.substr(idx + offset - padding, padding);
    }
    else {
      result += text.substr(offset, idx);
    }
    let match = text.substr(idx+offset,term.length);
    result += `<b>${match}</b>`;
    lcText = lcText.substr(idx + term.length);
    offset = offset + idx + term.length;
    idx = lcText.indexOf(term);
  }
  if (offset < text.length) {
    if (text.length - offset > padding) {
      result += text.substr(offset, padding) + '...';
    }
    else {
      result += text.substr(offset);
    }
  }
  return result;
};

const Suggestion = ({sugg, lcQuery, regex, callback}) => {
  let matches = sugg.label.match(regex);
  let label = 'no match?';
  if (matches) {
    label = boldify(sugg.label, lcQuery, PADDING);
  }
  else {
    label = boldify(sugg.text[0], lcQuery, PADDING);
  }
  const url=`${sugg.brapiUrl}/${sugg.entity === 'germplasm' ? 'germplasm-search' : sugg.entity}?${sugg.fq}=${sugg.fv}`;
  return <tr>
    <td><button onClick={() => callback(url)}>{sugg.brapiName}</button></td>
    <td>{sugg.tally}</td>
    <td dangerouslySetInnerHTML={{__html:label}}/>
  </tr>
};

const Suggestions = ({suggestions, queryString, onSelectSuggestion}) => {
  let lcQuery = queryString.toLowerCase();
  let regex = new RegExp(`/${lcQuery}/i`);
  return (
    <div>
      {suggestions.map((group,idx) => (
        <div key={idx}>
          <div>{group.groupValue} {group.numFound}</div>
          <table>
            <thead>
            <tr>
              <th>BrAPI site</th>
              <th>count</th>
              <th>match</th>
            </tr>
            </thead>
            <tbody>
            {group.doclist.docs.map((sugg, suggIdx) => (
              <Suggestion key={suggIdx} sugg={sugg} lcQuery={lcQuery} regex={regex} callback={onSelectSuggestion}/>
            ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  )
};

const SearcherCmp = (props) => (
  <div>
    <SuggestionsSearchbar {...props}/>
    <SuggestionsSummary {...props}/>
    {props.queryString.length > 0 && <Suggestions {...props}/>}
  </div>
);

const mapState = state => state.searcher;
const mapDispatch = dispatch => bindActionCreators({ fetchSuggestionsIfNeeded }, dispatch);

export const Searcher = connect(mapState, mapDispatch)(SearcherCmp);
