import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

class SolutionSubmitForm extends React.Component {
  constructor(props) {
    super(props)

    this.updateView = this.updateView.bind(this)
    this.submitSolution = this.submitSolution.bind(this)
    this.updateSolutionForm = this.updateSolutionForm.bind(this)
  }
  updateView(event) {
    this.props.dispatch({
      type: 'UPDATED_VIEW',
      payload: {
        text: event.target.dataset.view
      }
    })
  }
  updateSolutionForm(event) {
    this.props.dispatch({
      type: 'UPDATED_SOLUTION_FORM',
      payload: {
        text: event.target.value
      }
    })
  }
  submitSolution(event) {
    event.preventDefault()
    const solutionForm = new FormData(event.target)
    const challengeSolution = solutionForm.get('solution-textarea')
    this.props.dispatch({
      type: 'UPDATED_SOLUTION',
      payload: {
        text: challengeSolution
      }
    })
  }
  render() {
    return (
      <FormContainer className={this.props.view === 'solutionForm' ? '' : 'hidden'}>
        <ChallengeTitle>{'Codewars Challenge: ' + this.props.selected.challenge.name}</ChallengeTitle>
        <h4>Submit a Solution</h4>
        <form onSubmit={this.submitSolution}>
          <SolutionTextarea className="code-text" name="solution-textarea"
            value={this.props.solutionForm} onChange={this.updateSolutionForm} required>
          </SolutionTextarea>
          <button type="button" className="btn btn-default challenge-view-btn"
            onClick={this.updateView} data-view="challengeView">Cancel</button>
          <SubmitButton type="submit" className="btn btn-default challenge-view-btn"
            data-view="challengeView">Submit</SubmitButton>
        </form>
      </FormContainer>
    )
  }
}

const FormContainer = styled.div`
  padding: 0 20px 20px;
  text-align: center;
`

const ChallengeTitle = styled.h3`
  font-weight: bold;
`

const SolutionTextarea = styled.textarea`
  display: block;
  margin: 30px auto;
  width: 1000px;
  height: 400px;
  resize: none;
  padding: 20px;
`

const SubmitButton = styled.button`
  margin-left: 50px;
`

function mapStateToProps(state) {
  return {
    view: state.view,
    selected: state.selectedChallenge,
    solutionForm: state.solutionForm
  }
}

const Connected = connect(mapStateToProps)(SolutionSubmitForm)
export default Connected
