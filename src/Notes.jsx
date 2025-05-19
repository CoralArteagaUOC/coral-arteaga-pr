import { useState } from 'react';
import Navbar from './mainComponents/Navbar.jsx';
import ActivePageIcon from './mainComponents/ActivePageIcon.jsx';
import NoteForm from './mainComponents/NoteForm.jsx';
import FolderList from './mainComponents/FolderList.jsx';
import { useLocation} from 'react-router-dom';


//TRY CATCH ERROR
//Fuente:https://www.w3schools.com/js/js_errors.asp#:~:text=JavaScript%20try%20and%20catch,occurs%20in%20the%20try%20block.
//LOCAL STORAGE
//Fuente:https://blog.logrocket.com/storing-retrieving-javascript-objects-localstorage/
const storageKey = 'folders';

function loadFolders() {
  try {
    const raw = localStorage.getItem(storageKey);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveFolders(list) {
  localStorage.setItem(storageKey, JSON.stringify(list));
}

//Note Function
export default function Notes() {

  //Initial states
  //Fuente:https://react.dev/reference/react/useState
  //Fuente:https://react.dev/reference/react/useState#updating-state-based-on-the-previous-state
  const [folders, setFolders] = useState(loadFolders);
  const [activeId, setActiveId] = useState(null);
  const location = useLocation();

  //FolderID and NoteID
  //Fuente:https://dev.to/speaklouder/ways-to-set-default-values-in-javascript-3n79#:~:text=Using%20the%20Logical%20OR%20Operator%20js&text=This%20operator%20lets%20us%20set,%7C%7C%20'Stranger'%3B%20console.
  //Pass data with Location.state
  //Fuente:https://dev.to/esedev/how-to-pass-and-access-data-from-one-route-to-another-with-uselocation-usenavigate-usehistory-hooks-1g5m
  const { folderId, noteId } = location.state || {};
  const currentFolderId = activeId || folderId; 
  //Find Element (element.data)
  //Fuente:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
  const activeFolder = folders.find(f => f.id === currentFolderId) || null;
  const selectedNote = noteId && activeFolder ? activeFolder.notes.find(n => n.id === noteId) : null;
  

  /* When a note is Saved */
  function handleSave(newNote) {
    if (!currentFolderId) return;

    const selected = folders.find((f) => f.id === currentFolderId);
    if (!selected) return;

    //Max folder capacity
    if (selected.notes.length >= 10) {
      window.alert('This folder is full – please choose another one.');
      return;
    }

    //Fuente:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
    setFolders((previousFolder) => {
      //Fuente:https://react.dev/reference/react/Children#children-map
      const updated = previousFolder.map((f) => {
        if (f.id !== currentFolderId) return f;

        // EDIT or ADD NEW NOTE (UPDATE OBJECT NOTE)
        //Fuente: https://react.dev/learn/updating-objects-in-state
        //Fuente:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax#object_literals
        //Fuente:https://youtu.be/YxQlt3n1ZPA?feature=shared
        let notes;
        if (selectedNote) {
          //Find the note to update
          //Fuente:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
          notes = f.notes.map(n =>
            n.id === selectedNote.id ? { ...n, ...newNote, id: selectedNote.id } : n
          );
        } else {
          notes = [...f.notes, newNote];
        }
        return { ...f, notes };
      });
      saveFolders(updated);
      return updated;
    });

    setActiveId(null);
    
  }

  
  return (
    <div className=" fixed top-0  grid grid-cols-[10%_1fr] h-screen gap-10">
      {/* Sidebar */}
      <div className="w-36">
        <Navbar />
      </div>

    
      <div className="w-400 flex flex-col h-screen justify-baseline gap-15">
        {/* Header Icon */}
        <div className="w-full h-1/6 border-3 border-black mt-10">
          <div className="w-22 h-22 bg-white rounded-xl">
            <ActivePageIcon />
          </div>
        </div>

    
        <div className="w-fill h-5/7 flex flex-row justify-evenly items-center gap-4  ">
          {/* Note form */}
          <div className="basis-4/8 h-2/2 p-2">
            <NoteForm activeFolder={activeFolder}onSave={handleSave}note={selectedNote}/>
          </div>


          {/* Folder list */}
          <div className="basis-4/8 h-2/2  p-2">
           
            <FolderList folders={folders} activeId={activeId} onSelect={setActiveId} />
            <br />
             <p className= "text-white mr-80">Para eliminar una carpeta, haga click derecho sobre el elemento</p>
          
          </div>
        </div>
      </div>
    </div>
  );
}
