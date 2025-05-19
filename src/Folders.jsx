import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './mainComponents/Navbar.jsx';
import ActivePageIcon from './mainComponents/ActivePageIcon.jsx';
import FolderList from './mainComponents/FolderList.jsx';




//TRY CATCH ERROR
//Fuente:https://www.w3schools.com/js/js_errors.asp#:~:text=JavaScript%20try%20and%20catch,occurs%20in%20the%20try%20block.
//LOCAL STORAGE
//Fuente:https://blog.logrocket.com/storing-retrieving-javascript-objects-localstorage/
const storageKey = 'folders';
const loadFolders = () => {
  try {
    const raw = localStorage.getItem(storageKey);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveFolders = (folders) => {
  localStorage.setItem(storageKey, JSON.stringify(folders));
  window.location.reload();
};

//NOTE GRID COMPONENT
function NoteGrid({ folder, onDouble, onDelete, onSelect }) {
  
  if (!folder) {
    return (
      <p className="text-center text-black mt-10">Choose a folder</p>
    );
  }

  // FOLDERS ARE ARRAYS 
  const notes = Array.isArray(folder.notes) ? folder.notes : [];
  //console.log("DEBUG: notes in folder", folder.name, notes);
  
  return (
    <div className="grid grid-cols-3 gap-3 w-full">
      {notes.map((n) => (
        <button
          key={n.id}

          //Delete or Select Note
          onDoubleClick={() => onDouble(folder.id, n.id)}
          onClick={e => e.shiftKey ? onDelete(n.id) : onSelect(folder.id)}

          className="rounded-lg px-2 py-1 bg-black text-white hover:bg-black/70"
        >
          {typeof n === "object" && n !== null && typeof n.title === "string"
            ? n.title
            : "Invalid note"}
        </button>
      ))}

      {/* Notes per folder */}
      <p className="col-span-3 text-xs text-center text-black mt-2">
        {notes.length}/10 
        {notes.length === 10 && '— The folder is full!'}
        {notes.length === 0 && '— No notes yet!'}
      </p>
    </div>
  );
}



//FOLDERS PAGE
export default function Folders() {
  const navigate = useNavigate();

  const [folders, setFolders] = useState(loadFolders);
  //Keep Folder ID in localStorage
  const [activeId, setActiveId] = useState(() => localStorage.getItem('activeFolderId') || null);
 
  const currentFolderId = activeId;

  //Delet Note
  //Fuente:https://react.dev/learn/updating-arrays-in-state
  //Fuente:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map      
  function deleteNote(noteId) {
    setFolders(previousFolder => {
      const updated = previousFolder.map(folder =>
        folder.id === currentFolderId
          ? { ...folder, notes: folder.notes.filter(n => n.id !== noteId) }
          : folder
      );
      saveFolders(updated);
      return updated;
    });
  }

  function handleSelectFolder(id) {
    setActiveId(id);
    localStorage.setItem('activeFolderId', id);
  }

  //Double‑click a note go to /Notes 
  function handleOpen(folderId, noteId) {
   navigate('/Notes', { state: { folderId, noteId }, replace: true });
  }

  const activeFolder = folders.find((f) => f.id === activeId) || null;

  
    

  return (
    <div className="fixed top-0 grid grid-cols-[10%_1fr] h-screen gap-10">
      {/* Sidebar */}
      <div className="w-36">
        <Navbar />
        
      </div>

     
      <div className="w-400 flex flex-col h-screen justify-baseline gap-15  ">
        {/* Header */}
        <div className="w-full h-1/6  mt-10">
          <div className="w-22 h-22 rounded-xl">
            <ActivePageIcon />
          </div>
        </div>

       
        <div className="w-fill h-5/7 flex flex-row justify-evenly items-center  ">
          {/* Folder List*/}
          <div className="basis-3/12 h-full  p-2 ">
            <FolderList
              folders={folders}
              activeId={activeId}
              onSelect={handleSelectFolder}
            />
            <br />
             <p className= "text-black ">Para eliminar una carpeta o una nota, haga click derecho sobre el elemento</p>
          </div>

          {/* Note grid */}
          <div className="basis-6/12 h-1/2 bg-white p-4 overflow-y-auto top-0 rounded-2xl mb-80">
            <h2 className="text-black mb-2">
              {activeFolder ? `${activeFolder.name} (${activeFolder.notes.length})` : '—'}
            </h2>
          
            <NoteGrid 
            folder={activeFolder} 
            onDouble={handleOpen} 
            onDelete={deleteNote} 
            onSelect={handleSelectFolder}/>
          </div>
        </div>
      </div>
      
    </div>
  );
}
