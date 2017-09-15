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
        <ChallengeTitle className="text-center">{'Codewars Challenge: ' + this.props.selected.name}</ChallengeTitle>
        <ChallengeContainer>
          <ChallengeSubtitle>Challenge Details</ChallengeSubtitle>
          <ChallengeDetails>
            <ul>
              <ChallengeDetail>{'Name: ' + this.props.selected.name}</ChallengeDetail>
              <ChallengeDetail>{'URL: '}
                <a href={this.props.selected.url}>{this.props.selected.url}</a>
              </ChallengeDetail>
              <ChallengeDetail>{'Difficulty: ' + this.props.selected.difficulty}</ChallengeDetail>
              <ChallengeDetail>{'Author: '}
                <a href={this.props.selected.authorUrl}>
                  {this.props.selected.author}
                </a>
              </ChallengeDetail>
            </ul>
          </ChallengeDetails>
        </ChallengeContainer>
        <ChallengeContainer>
          <ChallengeSubtitle>Challenge Description</ChallengeSubtitle>
          <ChallengeDescription>
            <div dangerouslySetInnerHTML={this.props.selected.description
              ? { __html: this.props.selected.description }
              : { __html: '<p>No Description Found</p>' }} />
          </ChallengeDescription>
        </ChallengeContainer>
        <ChallengeContainer className={this.props.selected.solution ? '' : 'hidden'}>
          <ChallengeSubtitle>Challenge Solution</ChallengeSubtitle>
          <ChallengeDescription>
            {this.props.selected.solution}
          </ChallengeDescription>
        </ChallengeContainer>
        <ButtonContainer className="col-sm-6 col-sm-offset-3">
          <button type="button" className="btn btn-default challenge-view-btn"
            onClick={this.updateView} data-view="submitForm">Submit a new challenge.</button>
          <SubmitButton type="button" className="btn btn-default challenge-view-btn"
            onClick={this.updateView} data-view="solutionForm">Submit a solution.</SubmitButton>
          <SubmitButton className="btn btn-default challenge-view-btn"
            onClick={this.updateView} data-view="challengeList">Return to Challenge List</SubmitButton>
        </ButtonContainer>
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

const ButtonContainer = styled.div`
  margin-top: 10px;
`

const SubmitButton = styled.button`
  margin-left: 30px;
`

function mapStateToProps(state) {
  return {
    view: state.view,
    selected: state.selectedChallenge
  }
}

const Connected = connect(mapStateToProps)(ChallengeView)
export default Connected
