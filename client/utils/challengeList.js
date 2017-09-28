import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import socket from './socket-connection'
import fetchSolution from './fetchSolution.js'
import fetchChallenge from './fetchChallenge.js'

class ChallengeList extends React.Component {
  constructor(props) {
    super(props)
    this.updateView = this.updateView.bind(this)
    this.updateSelected = this.updateSelected.bind(this)
    this.hasBeenFetched = this.hasBeenFetched.bind(this)
  }
  componentDidMount() {
    socket.on('fetchedData', fetchedChallenges => {
      const challengeList = fetchedChallenges.map(challengeData => challengeData.challenge)
      const fetched = fetchedChallenges.filter(challengeData => challengeData.description)
      this.props.dispatch({
        type: 'RECEIVED_FETCHED_DATA',
        payload: { fetched, challengeList }
      })
    })
  }
  updateView(event) {
    this.props.dispatch({
      type: 'UPDATED_VIEW',
      payload: {
        text: event.target.dataset.view
      }
    })
  }
  hasBeenFetched(challenge) {
    const fetchedIndex = this.props.fetchedData.findIndex(data => data.challenge.id === challenge.id)
    console.log('HAS BEEN FETCHED: ', fetchedIndex !== -1)
    return fetchedIndex !== -1 ? this.props.fetchedData[fetchedIndex] : null
  }
  updateSelected(event) {
    const selectedId = event.target.dataset.id
    const selectedIndex = this.props.challenges.findIndex(challenge => challenge.id === selectedId)
    const challenge = this.props.challenges[selectedIndex]
    const previouslyFetched = this.hasBeenFetched(challenge)
    if (previouslyFetched) {
      return this.props.dispatch({
        type: 'UPDATED_SELECTED',
        payload: {
          challenge: challenge,
          description: previouslyFetched.description,
          solution: previouslyFetched.solution
        }
      })
    }
    let description = ''
    let solution = ''
    fetchChallenge(challenge.url).then(challengeData => {
      description = challengeData.description
      fetchSolution(challenge.name).then(solutionData => {
        solution = solutionData.solution
        this.props.dispatch({
          type: 'UPDATED_SELECTED',
          payload: {
            challenge: this.props.challenges[selectedIndex],
            description,
            solution
          }
        })
      }).catch(err => {
        console.log(err)
        this.props.dispatch({
          type: 'UPDATED_SELECTED',
          payload: {
            challenge: this.props.challenges[selectedIndex],
            description: description,
            solution: ''
          }
        })
      })
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
                    <ChallengeLink href={'https://www.codewars.com/users/' + challenge.authorUrl}>
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
    challenges: state.challenges,
    fetchedData: state.fetchedData
  }
}

const Connected = connect(mapStateToProps)(ChallengeList)
export default Connected
