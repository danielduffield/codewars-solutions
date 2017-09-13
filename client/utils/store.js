import { createStore } from 'redux'

const examples = [
  {
    id: '1',
    url: 'https://www.codewars.com',
    name: 'testChallenge',
    author: 'testAuthor',
    authorUrl: 'https://www.codewars.com',
    difficulty: '4 kyu',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  },
  {
    id: '2',
    url: 'https://www.codewars.com/kata/snail',
    name: 'Snail',
    author: 'StevenBarragan',
    authorUrl: 'https://www.codewars.com/users/stevenbarragan',
    difficulty: '4 kyu',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  }
]

function reducer(state = {
  urlForm: '',
  view: 'challengeList',
  selectedChallenge: examples[0],
  challenges: examples
}, action) {
  switch (action.type) {
    case 'UPDATED_VIEW':
      return Object.assign({}, state, { view: action.payload.text, urlForm: '' })
    case 'UPDATED_URL_FORM':
      return Object.assign({}, state, { urlForm: action.payload.text })
    case 'ADDED_CHALLENGE':
      return Object.assign({}, state, {
        selectedChallenge: action.payload,
        urlForm: '',
        view: 'challengeView',
        challenges: [...state.challenges, action.payload]
      })
    case 'UPDATED_SELECTED':
      const selectedIndex = state.challenges.findIndex(challenge => challenge.id === action.payload.text)
      const selected = state.challenges[selectedIndex]
      return Object.assign({}, state, { selectedChallenge: selected, view: 'challengeView' })
    default: return state
  }
}

export default createStore(reducer)
