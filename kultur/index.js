import React from 'react'
import { render } from 'react-dom'
import App from './containers/App.jsx'
import dataStore from './dataStore.js'
import rankStore from './rankStore.js'


const root = document.getElementById('root')

render(<App dataStore={dataStore} rankStore={rankStore}/>, root)
