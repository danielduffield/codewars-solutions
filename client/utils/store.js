import { createStore } from 'redux'

function reducer(state = [
  {
    name: 'testChallenge',
    author: 'testAuthor',
    difficulty: '4 kyu'
  }
], action) {
  switch (action.type) {
    default: return state
  }
}

export default createStore(reducer)
