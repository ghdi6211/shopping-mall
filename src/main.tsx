import { BrowserRouter, useRoutes } from 'react-router-dom';
import ReactDOM from 'react-dom/client'
import React from 'react'
import App from './app'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
