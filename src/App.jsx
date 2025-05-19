import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './mainComponents/Navbar.jsx'
import ActivePageIcon from './mainComponents/ActivePageIcon.jsx'



function App() {

  return (
    <div className="fixed top-0 grid grid-cols-[10%_1fr] h-screen gap-10">
      <div className='w-36'>
        <Navbar/>
      </div>
      <div className=" w-400 flex flex-col h-screen justify-baseline gap-15
        " >
            <div className= "w-450 h-1/6  border-3 border-black mt-10"> 
                <div className= " w-22 h-22 bg-white rounded-xl">
                    <ActivePageIcon/>
                </div>    
            </div>

            <div className="w-fill h-5/7 flex flex-row justify-center items-center gap-4
            ">
                <div className= "w-6/8 h-1/2 border-3 text-white items-center mb-50">

                  <h1> Instrucciones</h1>
                  <br />
                  <p className = "text-2xl"> Utilice la BARRA DE NAVEGACIÓN para acceder
                    a las diferentes secciones de la aplicación.
                  </p>
                  <br />
                  <p className = "text-2xl"> 
                    La primera página es la de "NOTES", donde podrá ver todas sus NOTAS.
                  </p>
                  <br />
                  <p className = "text-2xl"> 
                    La segunda página es la de "FOLDERS", donde podrá ver todas sus CARPETAS.
                  </p>
                  <br />
                  <p className = "text-2xl"> 
                    Las demás páginas no tienen aún funcionalidad
                  </p>
    
                </div>
            </div>
          
      </div>
    </div>
    
  );
};

export default App

/*
            
            
             */