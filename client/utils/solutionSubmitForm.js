import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

class SolutionSubmitForm extends React.Component {
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
      <FormContainer className={this.props.view === 'solutionForm' ? '' : 'hidden'}>
        <ChallengeTitle>Codewars Challenge: Snail</ChallengeTitle>
        <h4>Submit a Solution</h4>
        <SolutionForm>
          <SolutionTextarea></SolutionTextarea>
          <button type="button" className="btn btn-default challenge-view-btn"
            onClick={this.updateView} data-view="challengeView">Cancel</button>
            <button type="button" className="btn btn-default challenge-view-btn"
              data-view="challengeView">Submit</button>
        </SolutionForm>
      </FormContainer>
    )
  }
}

const FormContainer = styled.div`
  padding: 20px;
  text-align: center;
`

const ChallengeTitle = styled.h3`
  font-weight: bold;
`

const SolutionForm = styled.form`

`

const SolutionTextarea = styled.textarea`
  display: block;
  margin: 0 auto;
`

function mapStateToProps(state) {
  return {
    view: state.view
  }
}

const Connected = connect(mapStateToProps)(SolutionSubmitForm)
export default Connected
