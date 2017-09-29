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
  solutionForm: '',
  view: 'challengeList',
  selectedChallenge: {
    challenge: examples[0],
    description: '',
    solution: ''
  },
  challenges: [],
  fetchedData: [],
  solutionLoaded: false
}, action) {
  switch (action.type) {
    case 'RECEIVED_FETCHED_DATA':
      return Object.assign({}, state, { fetchedData: action.payload.fetched, challenges: action.payload.challengeList })
    case 'UPDATED_VIEW':
      return Object.assign({}, state, { view: action.payload.text, urlForm: '' })
    case 'UPDATED_URL_FORM':
      return Object.assign({}, state, { urlForm: action.payload.text })
    case 'UPDATED_SOLUTION_FORM':
      return Object.assign({}, state, { solutionForm: action.payload.text })
    case 'ADDED_CHALLENGE':
      return Object.assign({}, state, {
        selectedChallenge: action.payload,
        fetchedData: [...state.fetchedData, action.payload],
        urlForm: '',
        view: 'challengeView',
        challenges: [...state.challenges, action.payload.challenge],
        solutionLoaded: false,
        solutionForm: ''
      })
    case 'UPDATED_SELECTED':
      return Object.assign({}, state, {
        selectedChallenge: action.payload,
        view: 'challengeView',
        solutionLoaded: false,
        solutionForm: ''
      })
    case 'LOADED_SOLUTION':
      return Object.assign({}, state, { solutionLoaded: true })
    case 'UPDATED_SOLUTION':
      const currentIndex = state.challenges.findIndex(challenge => challenge.id === state.selectedChallenge.challenge.id)
      const updated = {}
      updated.challenge = Object.assign({}, state.challenges[currentIndex])
      updated.description = state.selectedChallenge.description
      updated.solution = action.payload.text
      const updatedChallenges = [
        ...state.challenges.slice(0, currentIndex),
        updated.challenge,
        ...state.challenges.slice(currentIndex + 1, state.challenges.length)
      ]
      return Object.assign({}, state, {
        challenges: updatedChallenges,
        view: 'challengeView',
        selectedChallenge: updated,
        fetchedData: [...state.fetchedData, updated], // REPLACE OLD CHALLENGE, NOT SUBMIT NEW CHALLENGE
        solutionLoaded: true,
        solutionForm: ''
      })
    default: return state
  }
}

export default createStore(reducer)
