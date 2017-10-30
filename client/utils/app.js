import React from 'react'
import { connect } from 'react-redux'

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
      this.props.dispatch({
        type: 'RECEIVED_FETCHED_DATA',
        payload: {
          fetched,
          challengeList,
          hash: window.location.hash.replace('#', '')
        }
      })
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
