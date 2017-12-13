import React from 'react'
import { connect } from 'react-redux'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { docco } from 'react-syntax-highlighter/styles/hljs'

class CodeSnippet extends React.Component {
  render() {
    return <SyntaxHighlighter language='javascript' style={docco}>{this.props.selected.solution}</SyntaxHighlighter>
  }

}

function mapStateToProps(state) {
  return {
    selected: state.selectedChallenge,
    solutionLoaded: state.solutionLoaded
  }
}

const Connected = connect(mapStateToProps)(CodeSnippet)
export default Connected
