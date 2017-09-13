import React from 'react'
import { connect } from 'react-redux'

class SolutionForm extends React.Component {
  render() {
    return (
      <div className={this.props.view === 'solutionForm' ? '' : 'hidden'}>
        <h3>Submit a Solution to Challenge</h3>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    view: state.view
  }
}

const Connected = connect(mapStateToProps)(SolutionForm)
export default Connected
