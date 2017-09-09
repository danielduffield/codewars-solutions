import { createStore } from 'redux'

function reducer(state = {
  view: 'challengeList',
  challenges: [
    {
      url: 'http://www.codewars.com',
      name: 'testChallenge',
      author: 'testAuthor',
      authorUrl: 'http://www.codewars.com',
      difficulty: '4 kyu'
    }
  ]
}, action) {
  switch (action.type) {
    case 'UPDATED_VIEW':
      return Object.assign({}, state, { view: action.payload.text })
    case 'ADDED_CHALLENGE':
      return Object.assign({}, state, {
        view: 'challengeList',
        challenges: [...state.challenges, action.payload]
      })
    default: return state
  }
}

export default createStore(reducer)
