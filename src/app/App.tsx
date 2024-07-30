import {BrowserRouter, Route,Routes } from 'react-router-dom'
import './App.css'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import Page404 from '../components/error/Page404'
import Layout from '../components/layout/Layout'
import Auth from '../pages/auth/Auth'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <ErrorBoundary fallback={<Page404/>}>
        <Suspense>
          <BrowserRouter>
            <ToastContainer />
            <Routes>
              <Route path='/login' element={ <Auth/>}/>
              <Route path='/register' element={ <Auth/>}/>
              <Route path='*' element ={<Layout/>} />
            </Routes>
          </BrowserRouter>
        </Suspense>
      </ErrorBoundary>
    </>
  )
}

export default App
