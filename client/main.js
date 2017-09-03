import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './utils/store'
import ChallengeList from './utils/challengeList'

const $root = document.getElementById('root')

render()

function render() {
  ReactDOM.render(
    <Provider store={store}>
      <ChallengeList />
    </Provider>,
    $root
  )
}
