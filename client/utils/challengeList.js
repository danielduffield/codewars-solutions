import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

class ChallengeList extends React.Component {
  constructor(props) {
    super(props)
    this.updateView = this.updateView.bind(this)
    this.updateSelected = this.updateSelected.bind(this)
  }
  updateView(event) {
    this.props.dispatch({
      type: 'UPDATED_VIEW',
      payload: {
        text: event.target.dataset.view
      }
    })
  }
  updateSelected(event) {
    const selected = {}
    const selectedId = event.target.dataset.id
    const selectedIndex = this.props.challenges.findIndex(challenge => challenge.id === selectedId)
    selected.challenge = selectedIndex !== -1 ? this.props.challenges[selectedIndex] : null

    fetch('/solution/' + selected.challenge.name)
      .then(responseData => responseData.json())
      .then(response => console.log(response))
    this.props.dispatch({
      type: 'UPDATED_SELECTED',
      payload: {
        text: event.target.dataset.id
      }
    })
  }
  render() {
    return (
      <div className={this.props.view === 'challengeList' ? 'text-center' : 'hidden'}>
        <table className="table table-bordered">
          <thead>
            <tr className="thead-row">
              <th className="text-center challenge-name">Challenge Name</th>
              <th className="text-center challenge-info">Author</th>
              <th className="text-center challenge-info">Difficulty*</th>
            </tr>
          </thead>
          <tbody>
            {this.props.challenges.map((challenge, index) => {
              return (
                <tr key={index}>
                  <ChallengeName>
                    <ChallengeLink href={'#'} data-id={challenge.id} onClick={this.updateSelected}>
                      {challenge.name}
                    </ChallengeLink>
                  </ChallengeName>
                  <ChallengeAuthor>
                    <ChallengeLink href={challenge.authorUrl}>
                      {challenge.author}
                    </ChallengeLink>
                  </ChallengeAuthor>
                  <ChallengeDifficulty>{challenge.difficulty}</ChallengeDifficulty>
                </tr>
              )
            })}
          </tbody>
        </table>
        <p className="text-center">*Difficulty increases at lower Kyu ratings</p>
        <button type="button" className="btn btn-default"
          onClick={this.updateView} data-view="submitForm">Submit a new challenge.</button>
      </div>
    )
  }
}

const ChallengeName = styled.td`
  width: 65%;
`

const ChallengeLink = styled.a`
  text-decoration: none;
  color: black;
`

const ChallengeAuthor = styled.td`
  width: 20%;
`

const ChallengeDifficulty = styled.td`
  width: 15%;
`

function mapStateToProps(state) {
  return {
    view: state.view,
    challenges: state.challenges
  }
}

const Connected = connect(mapStateToProps)(ChallengeList)
export default Connected
