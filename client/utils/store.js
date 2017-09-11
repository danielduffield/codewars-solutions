import { createStore } from 'redux'

function reducer(state = {
  view: 'challengeView',
  selectedChallenge: {
    url: 'http://www.codewars.com',
    name: 'testChallenge',
    author: 'testAuthor',
    authorUrl: 'http://www.codewars.com',
    difficulty: '4 kyu',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  },
  challenges: [
    {
      url: 'http://www.codewars.com',
      name: 'testChallenge',
      author: 'testAuthor',
      authorUrl: 'http://www.codewars.com',
      difficulty: '4 kyu',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
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
