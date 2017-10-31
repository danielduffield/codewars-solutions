import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

class ChallengeView extends React.Component {
  constructor(props) {
    super(props)
    this.updateView = this.updateView.bind(this)
    this.loadSolution = this.loadSolution.bind(this)
  }
  updateView(event) {
    this.props.dispatch({
      type: 'UPDATED_VIEW',
      payload: {
        text: event.target.dataset.view
      }
    })
  }
  loadSolution() {
    this.props.dispatch({
      type: 'LOADED_SOLUTION'
    })
  }
  render() {
    return (
      <div className={this.props.view === 'challengeView' ? '' : 'hidden'}>
        <ChallengeTitle className="text-center">{'Codewars Challenge: ' + this.props.selected.challenge.name}</ChallengeTitle>
        <ChallengeContainer>
          <ChallengeSubtitle>Challenge Details</ChallengeSubtitle>
          <ChallengeDetails>
            <ul>
              <ChallengeDetail>{'Name: ' + this.props.selected.challenge.name}</ChallengeDetail>
              <ChallengeDetail>{'URL: '}
                <a href={'https://www.codewars.com/kata/' + this.props.selected.challenge.url}>
                  {'https://www.codewars.com/kata/' + this.props.selected.challenge.url}
                </a>
              </ChallengeDetail>
              <ChallengeDetail>{'Difficulty: ' + this.props.selected.challenge.difficulty}</ChallengeDetail>
              <ChallengeDetail>{'Author: '}
                <a href={'https://www.codewars.com/users/' + this.props.selected.challenge.authorUrl}>
                  {this.props.selected.challenge.author}
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
        <ChallengeContainer className={this.props.solutionLoaded ? '' : 'hidden'}>
          <ChallengeSubtitle>Challenge Solution</ChallengeSubtitle>
          <ChallengeDescription>
            {this.props.selected.solution
              ? this.props.selected.solution.split('\n').map((line, index) => {
                line = line.replace(/ {2}/g, '    ')
                return <p className="code-text" key={index}>{line}</p>
              })
              : 'No solution found'}
          </ChallengeDescription>
        </ChallengeContainer>
        <ButtonContainer className="col-sm-6 col-sm-offset-3">
          <a href="#submit-challenge">
            <button type="button" className="btn btn-default challenge-view-btn"
              onClick={this.updateView} data-view="submitForm">Submit a New Challenge.</button>
          </a>
          <SubmitButton type="button"
            className={this.props.selected.solution ? 'hidden' : 'btn btn-default challenge-view-btn'}
            onClick={this.updateView} data-view="solutionForm">Submit a Solution.</SubmitButton>
          <SubmitButton type="button"
            className={this.props.selected.solution && !this.props.solutionLoaded
              ? 'btn btn-default challenge-view-btn' : 'hidden'}
            onClick={this.loadSolution} data-view="solutionForm">View the Solution.</SubmitButton>
          <a href="#">
            <SubmitButton className={'btn btn-default challenge-view-btn' + (this.props.solutionLoaded ? ' pull-right' : '')}>
              Return to Challenge List</SubmitButton>
          </a>
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
    selected: state.selectedChallenge,
    solutionLoaded: state.solutionLoaded
  }
}

const Connected = connect(mapStateToProps)(ChallengeView)
export default Connected
