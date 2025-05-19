import React, { useState, useEffect } from "react";
import { BsPlusCircle, BsArrowDownCircle } from "react-icons/bs";


//TRY CATCH ERROR
//Fuente:https://www.w3schools.com/js/js_errors.asp#:~:text=JavaScript%20try%20and%20catch,occurs%20in%20the%20try%20block.
//LOCAL STORAGE
//Fuente:https://blog.logrocket.com/storing-retrieving-javascript-objects-localstorage/
const storageKey = "folders";

function saveFolders(folders) {
  try {
    localStorage.setItem(storageKey, JSON.stringify(folders));
  } catch (err) {
    console.error("Could not save folders", err);
  }
}

function loadFolders() {
  try {
    const raw = localStorage.getItem(storageKey);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

//Folders per block
const blockSize = 5; 

export default function FolderList({ folders = [], activeId, onSelect = () => {} }) {

  const [list, setList] = useState(() => {
    const stored = loadFolders();
    return stored.length ? stored : folders;
  });

  
  const [page, setPage] = useState(0);
  useEffect(() => saveFolders(list), [list]);
  const sorted = [...list].sort((a, b) => a.name.localeCompare(b.name));

  //Pagination variables
  //Fuente://fuente:https://www.contentful.com/blog/react-pagination/
  const pageCount = Math.max(1, Math.ceil(sorted.length / blockSize));
  const currentPage = Math.min(page, pageCount - 1);
  //Calculate the slice of folders to show (extracted elements)
  //Fuente:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
  const pageFolders = sorted.slice(currentPage * blockSize,currentPage * blockSize + blockSize);

  //FOLDERS BLOCK FUNCTIONS
  function addFolder() {
    const name = prompt("New folder name:")?.trim();
    if (!name) return;

    const newFolder = {
      id: Date.now().toString(),
      name,
      notes: [],
    };

    const updated = [...list, newFolder];
    setList(updated);

   
  }

  function deleteFolder(id) {
    const updated = list.filter((f) => f.id !== id);
    setList(updated);

    // Stay within bounds of block size
    //fuente:https://www.contentful.com/blog/react-pagination/
    setPage((p) => Math.min(p, Math.ceil(updated.length / blockSize) - 1));
  }


  function nextPage() {
    if (currentPage < pageCount - 1) setPage(currentPage + 1);
  }

  //Folder Row component
  function FolderRow({ folder }) {
        const isActive = folder.id === activeId;
        const noteCount = folder.notes ? folder.notes.length : 0;

        return (
        <button
        //Shift + click to delete
            onClick={e => e.shiftKey ? deleteFolder(folder.id)  : onSelect(folder.id)}

            className={`w-full flex justify-between items-center px-3 py-1.5 border-2 rounded-lg text-sm transition select-none
            ${isActive? "bg-white text-white border-white" : "bg-transparent text-white border-white"}
            `}
        >
            {folder.name}
            <span className="text-xs opacity-60">({noteCount})</span>
        </button>
        );
  }

  //Add folder button
  function PlusButton() {
    return (
      <button
        onClick={addFolder}
        aria-label="Add folder"
        className="text-white hover:text-gray-300"
      >
        <BsPlusCircle className="w-10 h-10" />
      </button>
    );
  }

  //Next block button
  function DownArrow() {
    //Disable when the last page
    //Fuente:https://www.dhiwise.com/post/the-ultimate-guide-to-react-button-disabled-best-practices
    const disabled = currentPage === pageCount - 1;
    return (
      <button
        onClick={nextPage}
        disabled={disabled}
        aria-label="Next block"
        className={`${disabled ? "opacity-30 cursor-default" : "hover:text-gray-300"} text-white`}
      >
        <BsArrowDownCircle className="w-10 h-10" />
      </button>
    );
  }


  return (
    <div className="relative flex items-start gap-2 text-white select-none">
      {/* Plus Button, Folder Row, DownArrow*/}
      <div className="flex flex-col items-center w-100 bg-black p-3 rounded-xl border border-white gap-2">
        <PlusButton />

        {pageFolders.map((folder) => (
          <FolderRow key={folder.id} folder={folder} />
        ))}

        <DownArrow />
      </div>

      {/* Pagination 
        Fuente:https://www.contentful.com/blog/react-pagination/
      */}
      {pageCount > 1 && (
        <div className="flex flex-col items-center mt-1">
          {Array.from({ length: pageCount }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`text-xs ${i === currentPage ? "text-white" : "text-white/60 hover:text-white"}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

     
    </div>
  );
}
