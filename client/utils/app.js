import React from 'react'
import ChallengeList from './challengeList.js'
import ChallengeSubmitForm from './challengeSubmitForm.js'
import ChallengeView from './challengeView.js'
import SolutionSubmitForm from './solutionSubmitForm.js'

function App() {
  return (
    <div>
      <ChallengeList/>
      <ChallengeSubmitForm/>
      <ChallengeView/>
      <SolutionSubmitForm/>
    </div>
  )
}

export default App
