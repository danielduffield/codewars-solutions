import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './utils/store.js'
import App from './utils/app.js'

const $root = document.getElementById('root')

render()

function render() {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    $root
  )
}
