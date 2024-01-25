import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.scss'
import {store}  from './store/store.js'
import {Provider} from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')).render(
  // so we can provide the access of store to all app components
  <Provider store={store}>    
    <App />
  </Provider>
)
