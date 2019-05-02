import _ from 'lodash';

const searcherDefaults = {
  api: 'http://localhost:10012/v1/suggest',
  onSelectSuggestion: suggestion => console.log('SelectSuggestion',suggestion)
};

const overrideDefaults = (defaults, props) => {
  let merged = {};
  _.each(defaults, (value, key) => {
    merged[key] = props.hasOwnProperty(key) ? props[key] : value
  });
  return merged;
};

const initializeState = (props) => {
  return {
    searcher: overrideDefaults(searcherDefaults, props),
  };
};

export default initializeState;
