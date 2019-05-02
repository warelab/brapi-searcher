import React, {Component} from 'react'
import {render} from 'react-dom'
import BrAPISearcher from '../../src'

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestion: null
    }
  }
  handleSuggestion(suggestion) {
    this.setState(suggestion)
  }
  renderSuggestion() {
    return (
      <pre>{ JSON.stringify(this.state.suggestion), null, 2}</pre>
    )
  }
  render() {
    return <div>
      <h1>BrAPI Searcher Demo</h1>
      <BrAPISearcher onSelectSuggestion={this.handleSuggestion}/>
      { this.state.suggestion && this.renderSuggestion() }
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
