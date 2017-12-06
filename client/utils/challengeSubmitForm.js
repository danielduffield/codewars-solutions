import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import fetchSolution from './fetchSolution.js'
import fetchChallenge from './fetchChallenge.js'

class ChallengeSubmitForm extends React.Component {
  constructor(props) {
    super(props)
    this.processForm = this.processForm.bind(this)
    this.handleUrlSubmission = this.handleUrlSubmission.bind(this)
    this.updateUrlForm = this.updateUrlForm.bind(this)
    this.updateChallengeList = this.updateChallengeList.bind(this)
  }
  processForm(form, fieldId) {
    return form.get(fieldId)
  }
  updateUrlForm(event) {
    this.props.dispatch({
      type: 'UPDATED_URL_FORM',
      payload: {
        text: event.target.value
      }
    })
  }
  updateChallengeList(challengeData) {
    fetchSolution(challengeData.challenge.name).then(response => {
      this.props.dispatch({
        type: 'ADDED_CHALLENGE',
        payload: {
          challenge: challengeData.challenge,
          description: challengeData.description,
          solution: response.solution
        }
      })
    }).catch(() => {
      challengeData.solution = ''
      this.props.dispatch({
        type: 'ADDED_CHALLENGE',
        payload: {
          challenge: challengeData.challenge,
          description: challengeData.description,
          solution: ''
        }
      })
    })
  }
  handleUrlSubmission(event) {
    event.preventDefault()
    const url = this.processForm(new FormData(event.target), 'url-input-field')
    fetchChallenge(url).then(challengeData => {
      this.updateChallengeList(challengeData)
    })
  }
  render() {
    return (
      <SubmitFormContainer className={this.props.view === 'submitForm' ? '' : 'hidden'}>
        <h3>Submit a New Challenge</h3>
        <UrlForm onSubmit={this.handleUrlSubmission}>
          <div className="input-group col-sm-6 col-sm-offset-3">
            <input type="text" className="form-control"
              name="url-input-field" placeholder="Enter a Codewars Kata URL"
              pattern="(https:\/\/www\.codewars\.com\/kata\/(.*)|www\.codewars\.com\/kata\/(.*)|codewars\.com\/kata\/(.*))"
              title="https://www.codewars.com/kata/CHALLENGE-URL"
              value={this.props.urlForm} onChange={this.updateUrlForm} required />
            <span className="input-group-btn">
              <button className="btn btn-default" type="submit">Submit</button>
            </span>
          </div>
        </UrlForm>
        <a href="#">
          <button className="btn btn-default">Return to Challenge List</button>
        </a>
      </SubmitFormContainer>
    )
  }
}

const SubmitFormContainer = styled.div`
  padding: 20px;
  text-align: center;
`

const UrlForm = styled.form`
  margin: 25px;
`

function mapStateToProps(state) {
  return {
    urlForm: state.urlForm,
    view: state.view
  }
}

const Connected = connect(mapStateToProps)(ChallengeSubmitForm)
export default Connected
