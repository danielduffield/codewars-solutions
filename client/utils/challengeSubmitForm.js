import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

class ChallengeSubmitForm extends React.Component {
  constructor(props) {
    super(props)
    this.updateView = this.updateView.bind(this)
    this.processForm = this.processForm.bind(this)
    this.handleUrlSubmission = this.handleUrlSubmission.bind(this)
    this.updateChallengeList = this.updateChallengeList.bind(this)
  }
  updateView(event) {
    this.props.dispatch({
      type: 'UPDATED_VIEW',
      payload: {
        text: event.target.dataset.view
      }
    })
  }
  processForm(form, fieldId) {
    return form.get(fieldId)
  }
  updateChallengeList(challengeData) {
    this.props.dispatch({
      type: 'ADDED_CHALLENGE',
      payload: challengeData
    })
  }
  handleUrlSubmission(event) {
    event.preventDefault()
    const url = this.processForm(new FormData(event.target), 'url-input-field')
    fetch('/submit-url', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ url })
    })
    .then(response => response.json())
    .then(apiData => {
      const challengeData = parseApiData(apiData)
      console.log(challengeData)
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
              title="https://www.codewars.com/kata/CHALLENGE-URL" required />
            <span className="input-group-btn">
              <button className="btn btn-default" type="submit">Submit</button>
            </span>
          </div>
        </UrlForm>
        <button className="btn btn-default"
          onClick={this.updateView} data-view="challengeList">Return to Challenge List</button>
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

function parseApiData(response) {
  const url = response.url
  const name = response.name
  const id = response.id
  const author = response.createdBy.username
  const authorUrl = response.createdBy.url
  const difficulty = response.rank.name
  console.log(response)
  const description = parseDescription(response.description)

  return { url, name, id, author, authorUrl, difficulty, description }
}

function parseDescription(description) {
  return description.split('\n').map((line, index) => <p key={index}>{line}</p>)
}

function mapStateToProps(state) {
  return {
    view: state.view
  }
}

const Connected = connect(mapStateToProps)(ChallengeSubmitForm)
export default Connected
