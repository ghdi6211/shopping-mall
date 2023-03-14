import { BrowserRouter, useRoutes } from 'react-router-dom';
import ReactDOM from 'react-dom/client'
import React from 'react'
import App from './app'
import './scss/index.scss'
import { worker } from './mocks/browser.js'
import { RecoilRoot } from 'recoil';

if(import.meta.env.DEV) {
  worker.start()
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <BrowserRouter>
      <App />
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>,
)
