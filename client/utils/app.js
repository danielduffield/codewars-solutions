import React from 'react'
import { connect } from 'react-redux'

import fetchSolution from './fetchSolution.js'
import ChallengeList from './challengeList.js'
import ChallengeSubmitForm from './challengeSubmitForm.js'
import ChallengeView from './challengeView.js'
import SolutionSubmitForm from './solutionSubmitForm.js'
import socket from './socket-connection'

class App extends React.Component {
  componentDidMount() {
    socket.on('fetchedData', fetchedChallenges => {
      const challengeList = fetchedChallenges.map(challengeData => challengeData.challenge)
      const fetched = fetchedChallenges.filter(challengeData => challengeData.description)
      const hash = window.location.hash.replace('#', '')
      if (hash.startsWith('challenge?')) {
        const challengeIndex = challengeList.findIndex(challenge => {
          return challenge.id === hash.replace('challenge?', '')
        })
        const challengeName = challengeList[challengeIndex].name
        fetchSolution(challengeName).then(currentSolution => {
          this.props.dispatch({
            type: 'RECEIVED_FETCHED_DATA',
            payload: {
              fetched,
              challengeList,
              hash,
              solution: currentSolution
            }
          })
        })
      }
      else {
        this.props.dispatch({
          type: 'RECEIVED_FETCHED_DATA',
          payload: {
            fetched,
            challengeList,
            hash,
            solution: null
          }
        })
      }
    })
  }
  render() {
    return (
      <div>
        <ChallengeList/>
        <ChallengeSubmitForm/>
        <ChallengeView/>
        <SolutionSubmitForm/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    view: state.view
  }
}

const Connected = connect(mapStateToProps)(App)
export default Connected
