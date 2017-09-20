import { createStore } from 'redux'

const examples = [
  {
    id: '1',
    url: 'https://www.codewars.com',
    name: 'testChallenge',
    author: 'testAuthor',
    authorUrl: 'https://www.codewars.com',
    difficulty: '4 kyu'
  },
  {
    id: '2',
    url: 'https://www.codewars.com/kata/snail',
    name: 'Snail',
    author: 'StevenBarragan',
    authorUrl: 'https://www.codewars.com/users/stevenbarragan',
    difficulty: '4 kyu'
  }
]

function reducer(state = {
  urlForm: '',
  view: 'challengeList',
  selectedChallenge: {
    challenge: examples[0],
    description: '',
    solution: ''
  },
  challenges: examples,
  fetchedData: [],
  solutionLoaded: false
}, action) {
  switch (action.type) {
    case 'UPDATED_VIEW':
      return Object.assign({}, state, { view: action.payload.text, urlForm: '' })
    case 'UPDATED_URL_FORM':
      return Object.assign({}, state, { urlForm: action.payload.text })
    case 'ADDED_CHALLENGE':
      return Object.assign({}, state, {
        selectedChallenge: action.payload,
        fetchedData: [...state.fetchedData, action.payload],
        urlForm: '',
        view: 'challengeView',
        challenges: [...state.challenges, action.payload.challenge],
        solutionLoaded: false
      })
    case 'UPDATED_SELECTED':
      return Object.assign({}, state, {
        selectedChallenge: action.payload,
        fetchedData: [...state.fetchedData, action.payload],
        view: 'challengeView',
        solutionLoaded: false
      })
    case 'LOADED_SOLUTION':
      return Object.assign({}, state, { solutionLoaded: true })
    case 'UPDATED_SOLUTION':
      const currentIndex = state.challenges.findIndex(challenge => challenge.id === state.selectedChallenge.id)
      const updated = Object.assign({}, state.challenges[currentIndex])
      updated.solution = action.payload.text
      const updatedChallenges = state.challenges.map((challenge, index) => index === currentIndex
        ? updated
        : Object.assign({}, challenge)
      )
      return Object.assign({}, state, { challenges: updatedChallenges, view: 'challengeView', selectedChallenge: updated })
    default: return state
  }
}

export default createStore(reducer)
