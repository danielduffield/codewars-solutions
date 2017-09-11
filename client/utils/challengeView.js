import React from 'react'
import { connect } from 'react-redux'

class ChallengeView extends React.Component {
  render() {
    return (
      <div>
        <h3>{'Codewars Challenge:' + this.props.selectedChallenge.name}</h3>
        <h4>Challenge Details</h4>
        <ul>
          <li>{'Name: ' + this.props.selectedChallenge.name}</li>
          <li>{'URL: ' + this.props.selectedChallenge.url}</li>
          <li>{'Difficulty: ' + this.props.selectedChallenge.difficulty}</li>
          <li>{'Author: '}
            <a href={this.props.selectedChallenge.authorUrl}>
              {this.props.selectedChallenge.author}
            </a>
          </li>
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    view: state.view
  }
}

const Connected = connect(mapStateToProps)(ChallengeView)
export default Connected
