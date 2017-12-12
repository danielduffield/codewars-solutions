import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import fetchSolution from './fetchSolution.js'
import fetchChallenge from './fetchChallenge.js'

class ChallengeList extends React.Component {
  constructor(props) {
    super(props)
    this.updateSelected = this.updateSelected.bind(this)
    this.hasBeenFetched = this.hasBeenFetched.bind(this)
    this.dispatchUpdate = this.dispatchUpdate.bind(this)
    this.updateSort = this.updateSort.bind(this)
  }
  componentDidMount() {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.replace('#', '')
      if (hash.startsWith('challenge?')) {
        const challengeIndex = this.props.challenges.findIndex(challenge => {
          return challenge.id === hash.replace('challenge?', '')
        })
        const challengeName = this.props.challenges[challengeIndex].name
        fetchSolution(challengeName).then(currentSolution => {
          this.props.dispatch({
            type: 'HASH_CHANGED',
            payload: {
              hash,
              solution: currentSolution
            }
          })
        })
      }
      else {
        this.props.dispatch({
          type: 'HASH_CHANGED',
          payload: {
            hash
          }
        })
      }
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
  updateSort(event) {
    const target = event.target.dataset.col
    const isAscending = event.target.dataset.col === this.props.currentSort.target
      ? !this.props.currentSort.isAscending
      : true
    this.props.dispatch({
      type: 'SORTED_LIST',
      payload: { target, isAscending }
    })
  }
  render() {
    console.log(this.props.challenges, this.props.currentSort)
    console.log(this.props.challenges.slice().map(challenge => challenge.name).sort((a, b) => a < b))
    return (
      <div className={this.props.view === 'challengeList' ? 'text-center' : 'hidden'}>
        <table className="table table-bordered">
          <thead>
            <tr className="thead-row" onClick={this.updateSort}>
              <th className="text-center challenge-name" data-col="name">Challenge Name</th>
              <th className="text-center challenge-info" data-col="author">Author</th>
              <th className="text-center challenge-info" data-col="difficulty">Difficulty*</th>
            </tr>
          </thead>
          <tbody>
            {this.props.challenges
              .slice()
              .sort((a, b) => this.props.currentSort.isAscending
                  ? (a[this.props.currentSort.target].toUpperCase() > b[this.props.currentSort.target].toUpperCase() ? 1 : -1)
                  : (a[this.props.currentSort.target].toUpperCase() > b[this.props.currentSort.target].toUpperCase() ? -1 : 1))
              .map((challenge, index) => {
                return (
                  <tr key={index}>
                    <ChallengeName className={index % 2 === 1 ? 'dark-row' : ''}>
                      <ChallengeLink href={'#challenge?' + challenge.id} data-id={challenge.id}>
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
          <ChallengeSubmit type="button" className="btn btn-default">Submit a new challenge.</ChallengeSubmit>
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

const ChallengeSubmit = styled.button`
  margin-bottom: 50px;
`

function mapStateToProps(state) {
  return {
    view: state.view,
    challenges: state.challenges,
    fetchedData: state.fetchedData,
    currentSort: state.currentSort
  }
}

const Connected = connect(mapStateToProps)(ChallengeList)
export default Connected
