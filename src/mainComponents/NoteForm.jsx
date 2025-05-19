import { useState, useEffect } from "react";



//NoteForm component
export default function NoteForm({ activeFolder, onSave, note }) {
  
  // Input fields states
  //Fuente:https://react.dev/reference/react/useState
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [deadline, setDeadline] = useState("");

  // Update fields when a new note is selected (get from props)
  //fuente:https://react.dev/reference/react/useEffect#usage
  useEffect(() => {
    setTitle(note ? note.title : "");
    setContent(note ? note.content : "");
    setDeadline(note ? note.deadline : "");
  }, [note]); //Everytime the note changes, update the fields
 
  //Validation
  //fuente:https://www.w3schools.com/jsref/jsref_trim_string.asp 
  const isReady =
    title.trim() !== "" &&
    content.trim() !== "" &&
    deadline !== "" &&
    activeFolder !== null;
  console.log(activeFolder);

  //Save function
  function handleSave() {
    if (!isReady) return; 

    // Note Object
    //Fuente: https://react.dev/learn/rendering-lists
    const newNote = {
      //Fuente:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now
      id: Date.now().toString(), // Todo: use Unique ID in Firebase +userID
      title: title.trim(),
      content: content.trim(),
      deadline, 
    };
    

    onSave(newNote); //Pass the new note to the folder

    // Reset fields
    setTitle("");
    setContent("");
    setDeadline("");
  }


  return (
    <div className="flex flex-col gap-3 h-full text-black p-4 rounded-lg bg-white border-black">
      {/* Header */}
      <h2 className="font-semibold">
        {activeFolder ? `New note in ${activeFolder.name}` : "Choose a folder first"}
        
      </h2>
      
      {/* INput FIELDS
          Fuente:https://react.dev/learn/separating-events-from-effects
          Fuente:https://react.dev/reference/react-dom/components/input#usage
          Fuente: https://youtu.be/IkMND33x0qQ?feature=shared
      */}
      {/* Title */}
      <input
        type="text"
        placeholder="NOTE TITLE"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="px-3 py-1.5 rounded bg-white border-1 border-black"
      />

      {/* Content */}
      <textarea
        placeholder="Write a note…"
        rows={10}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="px-3 py-2 rounded bg-white border-1 border-black resize-none text-sm flex-1"
      />

      {/* Deadline */}
      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        className="px-3 py-1.5 rounded bg-white border-1 border-black text-sm"
      />

      {/* Chosen folder*/}
      <input
        type="text"
        disabled
        value={activeFolder ? activeFolder.name : "— no folder —"}
        className="px-3 py-1.5 rounded bg-white border-1 border-black text-sm cursor-default"
      />

      {/* Save */}
      <button
        onClick={handleSave} // Call the save function from Notes
        disabled={!isReady}
        className={`self-end mt-2 px-4 py-1.5 rounded border text-sm transition
          ${isReady
            ? "text-white border-black bg-white"
            : "text-white opacity-40 cursor-not-allowed"}`}
      >
        Save
      </button>
    </div>
  );
}
