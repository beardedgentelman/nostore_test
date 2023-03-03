import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { clearStore } from 'actions/clearStoreAction'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from 'store/configureStore'

import App from './App'

import './index.css'

window.addEventListener('beforeunload', () => {
  store.dispatch(clearStore())
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
)
