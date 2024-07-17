import {BrowserRouter, Route,Routes } from 'react-router-dom'
import './App.css'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import Page404 from '../components/error/Page404'
import Login from '../pages/login/Login'
import Layout from '../components/layout/Layout'

function App() {
  return (
    <>
      <ErrorBoundary fallback={<Page404/>}>
        <Suspense>
          <BrowserRouter>
            <Routes>
              <Route path='/login' element={ <Login/>}/>
              <Route path='*' element ={<Layout/>} />
            </Routes>
          </BrowserRouter>
        </Suspense>
      </ErrorBoundary>
    </>
  )
}

export default App
