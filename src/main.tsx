import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import TodoManager from './pages/TodoManager.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TodoManager />
  </React.StrictMode>,
)
