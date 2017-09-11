import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

class ChallengeView extends React.Component {
  render() {
    return (
      <div className={this.props.view === 'challengeView' ? '' : 'hidden'}>
        <ChallengeTitle className="text-center">{'Codewars Challenge: ' + this.props.selectedChallenge.name}</ChallengeTitle>
        <ChallengeDetails>
          <h4>Challenge Details</h4>
          <ul>
            <ChallengeDetail>{'Name: ' + this.props.selectedChallenge.name}</ChallengeDetail>
            <ChallengeDetail>{'URL: ' + this.props.selectedChallenge.url}</ChallengeDetail>
            <ChallengeDetail>{'Difficulty: ' + this.props.selectedChallenge.difficulty}</ChallengeDetail>
            <ChallengeDetail>{'Author: '}
              <a href={this.props.selectedChallenge.authorUrl}>
                {this.props.selectedChallenge.author}
              </a>
            </ChallengeDetail>
          </ul>
        </ChallengeDetails>
        <ChallengeDescription>
          <h4>Challenge Description</h4>
          <p>{this.props.selectedChallenge.description}</p>
        </ChallengeDescription>
      </div>
    )
  }
}

const ChallengeTitle = styled.h3`
  font-weight: bold;
`

const ChallengeDetails = styled.div`
  padding: 10px;
  background-color: lightgrey;
`

const ChallengeDescription = styled.div`
  padding: 10px;
  background-color: lightgrey;
`

const ChallengeDetail = styled.li`
  margin: 20px 0 0 20px;
`

function mapStateToProps(state) {
  return {
    view: state.view,
    selectedChallenge: state.selectedChallenge
  }
}

const Connected = connect(mapStateToProps)(ChallengeView)
export default Connected
