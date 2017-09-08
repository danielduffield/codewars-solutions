import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

class ChallengeSubmitForm extends React.Component {
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
      <SubmitFormContainer className={this.props.view === 'submitForm' ? '' : 'hidden'}>
        <h3>Submit a New Challenge</h3>
        <UrlForm>
          <div className="input-group col-sm-6 col-sm-offset-3">
            <input type="text" className="form-control" placeholder="Enter a Codewars Url" />
            <span className="input-group-btn">
              <button className="btn btn-default" type="button">Submit</button>
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

function mapStateToProps(state) {
  return {
    view: state.view
  }
}

const Connected = connect(mapStateToProps)(ChallengeSubmitForm)
export default Connected
