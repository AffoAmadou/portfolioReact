import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.scss'

import { PrismicProvider } from '@prismicio/react'
import { client } from './prismic'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <PrismicProvider client={client}>
      <App />
      <App />
    </PrismicProvider>
  // </React.StrictMode>,
)
