import React from "react"
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

// root routes

const routes=createBrowserRouter([
  {
    path:'/',
    element:<div>main route</div>
  },
  {
    path:'/register',
    element:<div>register route</div>
  },
])


export default function App() {
  return (
    <main>
      <RouterProvider router={routes}></RouterProvider>
    </main>
  )
}