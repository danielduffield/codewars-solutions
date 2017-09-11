import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

class ChallengeView extends React.Component {
  render() {
    return (
      <div className={this.props.view === 'challengeView' ? '' : 'hidden'}>
        <ChallengeTitle className="text-center">{'Codewars Challenge: ' + this.props.selectedChallenge.name}</ChallengeTitle>
        <ChallengeContainer>
          <h4>Challenge Details</h4>
          <ChallengeDetails>
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
        </ChallengeContainer>
        <ChallengeContainer>
          <h4>Challenge Description</h4>
          <ChallengeDescription>
            <p>{this.props.selectedChallenge.description}</p>
          </ChallengeDescription>
        </ChallengeContainer>
      </div>
    )
  }
}

const ChallengeTitle = styled.h3`
  font-weight: bold;
`

const ChallengeContainer = styled.div`
  margin-top: 20px;
  padding: 10px;
  background-color: lightgrey;
`

const ChallengeDetails = styled.div`
  padding: 10px 20px 20px;
  background-color: grey;
`

const ChallengeDetail = styled.li`
  margin: 20px 0 0 20px;
`

const ChallengeDescription = styled.div`
  padding: 30px;
  background-color: grey;
`

function mapStateToProps(state) {
  return {
    view: state.view,
    selectedChallenge: state.selectedChallenge
  }
}

const Connected = connect(mapStateToProps)(ChallengeView)
export default Connected
