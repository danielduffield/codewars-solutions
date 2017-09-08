import React from 'react'
import styled from 'styled-components'

export default class ChallengeSubmitForm extends React.Component {
  render() {
    return (
      <SubmitFormContainer>
        <h3>Submit a New Challenge</h3>
        <UrlForm>
          <div className="input-group col-sm-6 col-sm-offset-3">
            <input type="text" className="form-control" placeholder="Enter a Codewars Url" />
            <span className="input-group-btn">
              <button className="btn btn-default" type="button">Submit</button>
            </span>
          </div>
        </UrlForm>
        <button className="btn btn-default">Return to Challenge List</button>
      </SubmitFormContainer>
    )
  }
}

const SubmitFormContainer = styled.div`
  margin-top: 20px;
  padding: 20px;
  background-color: grey;
  text-align: center;
`

const UrlForm = styled.form`
  margin: 25px;
`
