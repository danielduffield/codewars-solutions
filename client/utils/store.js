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
  currentSort: {
    target: 'name',
    isAscending: true
  },
  challenges: [],
  fetchedData: [],
  solutionLoaded: false
}, action) {
  switch (action.type) {
    case 'RECEIVED_FETCHED_DATA':
      console.log('FETCHED DATA ', action.payload)
      const parsedHash = parseHash(action.payload.hash)
      let selected = null
      if (parsedHash.selectedId) {
        const selectedIndex = action.payload.fetched.findIndex(data => data.challenge.id === parsedHash.selectedId)
        selected = action.payload.fetched[selectedIndex]
        console.log(parsedHash.selectedId, selectedIndex, selected)
        selected.solution = action.payload.solution.solution
      }
      return Object.assign({}, state, {
        fetchedData: action.payload.fetched,
        challenges: action.payload.challengeList,
        view: parsedHash.view || state.view,
        selectedChallenge: selected || state.selectedChallenge
      })
    case 'UPDATED_VIEW':
      return Object.assign({}, state, { view: action.payload.text, urlForm: '' })
    case 'HASH_CHANGED':
      const { view, selectedId } = parseHash(action.payload.hash)
      let selectedChallenge = null
      if (selectedId) {
        const selectedIndex = state.fetchedData.findIndex(data => data.challenge.id === selectedId)
        selectedChallenge = state.fetchedData[selectedIndex]
        if (action.payload.solution) selectedChallenge.solution = action.payload.solution.solution
      }
      return Object.assign({}, state,
        {
          view: (view || state.view),
          selectedChallenge: selectedChallenge || state.selectedChallenge,
          contact: {
            input: '',
            selected: ''
          },
          solutionLoaded: false
        })
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
    case 'SORTED_LIST':
      return Object.assign({}, state, {
        currentSort: {
          target: action.payload.target,
          isAscending: action.payload.isAscending
        }
      })
    default: return state
  }
}

function parseHash(url) {
  let parsed = ''
  const validHashes = ['home', 'challenge', 'submit-challenge', 'submit-solution']
  const views = ['challengeList', 'challengeView', 'submitForm', 'solutionForm']
  validHashes.forEach((hash, index) => {
    if (hash === url.split('?')[0]) {
      parsed = views[index]
    }
  })
  let selectedId = ''
  if (parsed === 'challengeView') selectedId = url.replace('challenge?', '')
  return {
    view: parsed || 'challengeList',
    selectedId
  }
}

export default createStore(reducer)
