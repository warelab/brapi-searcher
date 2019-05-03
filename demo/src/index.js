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
    console.log('received suggestion',suggestion);
    // this.setState({suggestion})
  }
  renderSuggestion() {
    return (
      <pre>{this.state.suggestion}</pre>
    )
  }
  render() {
    return <div>
      <h1>BrAPI Searcher Demo</h1>
      <BrAPISearcher onSelectSuggestion={(url) => this.handleSuggestion(url)}/>
      { this.state.suggestion && this.renderSuggestion() }
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
