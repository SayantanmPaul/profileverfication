import React from "react"
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

// importing components

import Username from './components/username';
import Profile from './components/profile';
import Registration from './components/registration';
import Password from './components/password';
import ResetPassword from './components/resetpassword';
import RecoverPassword from './components/recoverpassword';
import ErrorPage from './components/errorpage';


// root routes

const routes=createBrowserRouter([
  {
    path:'/',
    element:<Username></Username>
  },
  {
    path:'/register',
    element:<Registration></Registration>
  },
  {
    path:'/password',
    element:<Password></Password>
  },
  {
    path:'/profile',
    element:<Profile></Profile>
  },
  {
    path:'/reset',
    element:<ResetPassword></ResetPassword>
  },
  {
    path:'/recoverpassword',
    element:<RecoverPassword></RecoverPassword>
  },
  {
    path:'*',
    element: <ErrorPage></ErrorPage>
  },
])


export default function App() {
  return (
    <main>
      <RouterProvider router={routes}></RouterProvider>
    </main>
  )
}