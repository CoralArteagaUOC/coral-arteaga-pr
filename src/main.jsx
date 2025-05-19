import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Signin from './Signin.jsx'
import Notes from './Notes.jsx'
import Folders from './Folders.jsx'
/*import Timer from './Timer.jsx'*/
import { AuthContextProvider } from './context/UserAuth.jsx'; 
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {path:"/",element:<App/>},
  {path: "/Signin", element:<Signin/>},
  {path: "/Notes", element: <Notes/>},
  {path: "/Folders", element: <Folders/>},
  /*{path:"/Timer", element: <Timer/>}*/
], {
  basename: '/coral-arteaga-pr'
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </StrictMode>,
)



