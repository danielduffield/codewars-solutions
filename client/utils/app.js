import React from 'react'
import ChallengeList from './challengeList.js'
import ChallengeSubmitForm from './challengeSubmitForm.js'
import ChallengeView from './challengeView.js'
import SolutionForm from './solutionForm.js'

function App() {
  return (
    <div>
      <ChallengeList/>
      <ChallengeSubmitForm/>
      <ChallengeView/>
      <SolutionForm/>
    </div>
  )
}

export default App
