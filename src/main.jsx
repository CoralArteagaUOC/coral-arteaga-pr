import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Signin from './Signin.jsx'
import Notes from './Notes.jsx'
import Folders from './Folders.jsx'
/*import Timer from './Timer.jsx'*/
import { AuthContextProvider } from './context/UserAuth.jsx'; 
import { HashRouter, Routes, Route } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/Signin" element={<Signin />} />
          <Route path="/Notes" element={<Notes />} />
          <Route path="/Folders" element={<Folders />} />
          {/* <Route path="/Timer" element={<Timer />} /> */}
        </Routes>
      </HashRouter>
    </AuthContextProvider>
  </StrictMode>,
)