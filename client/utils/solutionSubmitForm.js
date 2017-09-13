import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

class SolutionSubmitForm extends React.Component {
  render() {
    return (
      <FormContainer className={this.props.view === 'solutionForm' ? '' : 'hidden'}>
        <h3>Codewars Challenge: Snail</h3>
        <h4>Submit a Solution</h4>
        <SolutionForm>
          <textarea></textarea>
          <button type="button" className="btn btn-default challenge-view-btn"
            onClick={this.updateView} data-view="challengeView">Return to challenge.</button>
        </SolutionForm>
      </FormContainer>
    )
  }
}

const FormContainer = styled.div`
  padding: 20px;
  text-align: center;
`

const SolutionForm = styled.form`

`

function mapStateToProps(state) {
  return {
    view: state.view
  }
}

const Connected = connect(mapStateToProps)(SolutionSubmitForm)
export default Connected
