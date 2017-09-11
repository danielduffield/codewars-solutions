import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

class ChallengeView extends React.Component {
  constructor(props) {
    super(props)
    this.updateView = this.updateView.bind(this)
  }
  updateView(event) {
    this.props.dispatch({
      type: 'UPDATED_VIEW',
      payload: {
        text: event.target.dataset.view
      }
    })
  }
  render() {
    return (
      <div className={this.props.view === 'challengeView' ? '' : 'hidden'}>
        <ChallengeTitle className="text-center">{'Codewars Challenge: ' + this.props.selectedChallenge.name}</ChallengeTitle>
        <ChallengeContainer>
          <ChallengeSubtitle>Challenge Details</ChallengeSubtitle>
          <ChallengeDetails>
            <ul>
              <ChallengeDetail>{'Name: ' + this.props.selectedChallenge.name}</ChallengeDetail>
              <ChallengeDetail>{'URL: '}
                <a href={this.props.selectedChallenge.url}>{this.props.selectedChallenge.url}</a>
              </ChallengeDetail>
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
          <ChallengeSubtitle>Challenge Description</ChallengeSubtitle>
          <ChallengeDescription>
            <p>{this.props.selectedChallenge.description}</p>
          </ChallengeDescription>
        </ChallengeContainer>
        <button className="btn btn-default"
          onClick={this.updateView} data-view="challengeList">Return to Challenge List</button>
      </div>
    )
  }
}

const ChallengeTitle = styled.h3`
  font-weight: bold;
`

const ChallengeSubtitle = styled.h4`
  color: white;
`

const ChallengeContainer = styled.div`
  margin-top: 20px;
  padding: 10px;
  background-color: dimgrey;
`

const ChallengeDetails = styled.div`
  padding: 10px 20px 20px;
  background-color: lightgrey;
`

const ChallengeDetail = styled.li`
  margin: 20px 0 0 20px;
`

const ChallengeDescription = styled.div`
  padding: 30px;
  background-color: lightgrey;
`

function mapStateToProps(state) {
  return {
    view: state.view,
    selectedChallenge: state.selectedChallenge
  }
}

const Connected = connect(mapStateToProps)(ChallengeView)
export default Connected
