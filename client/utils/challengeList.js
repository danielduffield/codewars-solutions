import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import socket from './socket-connection'
import fetchSolution from './fetchSolution.js'
import fetchChallenge from './fetchChallenge.js'

class ChallengeList extends React.Component {
  constructor(props) {
    super(props)
    this.updateSelected = this.updateSelected.bind(this)
    this.hasBeenFetched = this.hasBeenFetched.bind(this)
    this.dispatchUpdate = this.dispatchUpdate.bind(this)
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
  hasBeenFetched(challenge) {
    const fetchedIndex = this.props.fetchedData.findIndex(data => data.challenge.id === challenge.id)
    console.log('HAS BEEN FETCHED: ', fetchedIndex !== -1)
    return fetchedIndex !== -1 ? this.props.fetchedData[fetchedIndex] : null
  }
  dispatchUpdate(challenge, description, solution) {
    this.props.dispatch({
      type: 'UPDATED_SELECTED',
      payload: {
        challenge,
        description,
        solution
      }
    })
  }
  updateSelected(event) {
    const selectedId = event.target.dataset.id
    const selectedIndex = this.props.challenges.findIndex(challenge => challenge.id === selectedId)
    const challenge = this.props.challenges[selectedIndex]
    let description = ''
    const previouslyFetched = this.hasBeenFetched(challenge)

    if (previouslyFetched) {
      description = previouslyFetched.description
      fetchSolution(challenge.name).then(solutionData => {
        this.dispatchUpdate(challenge, description, solutionData.solution)
      }).catch(err => {
        console.log(err)
        this.dispatchUpdate(challenge, description, '')
      })
    }
    else {
      fetchChallenge(challenge.url).then(challengeData => {
        description = challengeData.description
        this.dispatchUpdate(challenge, description, '')
      })
    }
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
                  <ChallengeName className={index % 2 === 1 ? 'dark-row' : ''}>
                    <ChallengeLink href={'#challenge'} data-id={challenge.id}>
                      {challenge.name}
                    </ChallengeLink>
                  </ChallengeName>
                  <ChallengeAuthor className={index % 2 === 1 ? 'dark-row' : ''}>
                    <ChallengeLink href={'https://www.codewars.com/users/' + challenge.authorUrl}>
                      {challenge.author}
                    </ChallengeLink>
                  </ChallengeAuthor>
                  <ChallengeDifficulty className={index % 2 === 1 ? 'dark-row' : ''}>{challenge.difficulty}</ChallengeDifficulty>
                </tr>
              )
            })}
          </tbody>
        </table>
        <p className="text-center">*Difficulty increases at lower Kyu ratings</p>
        <a href="#submit-challenge">
          <button type="button" className="btn btn-default">Submit a new challenge.</button>
        </a>
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
