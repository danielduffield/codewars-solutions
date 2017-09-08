import { createStore } from 'redux'

function reducer(state = {
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
    default: return state
  }
}

export default createStore(reducer)
