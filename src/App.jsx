import { useState, useEffect } from 'react';
import './App.css';
import Folders from './components/Folders.jsx';
import Notes from './components/Notes.jsx';

function App () {
    const [folders, setFolders] = useState(() => {
        const savedFolders = localStorage.getItem('folders')
        return savedFolders 
        ? JSON.parse(savedFolders) 
        : [{id: 1, name: 'All notes'}]
    });

    useEffect(() => {
        localStorage.setItem('folders', JSON.stringify(folders));
    }, [folders]);

    const [notes, setNotes] = useState(() =>{
        const savedNotes = localStorage.getItem('notes');
        return savedNotes ? JSON.parse(savedNotes) : [];
    });

    useEffect(() => {
        localStorage.setItem('notes', JSON.stringify(notes));
    }, [notes])

    const [activeFolder, setActiveFolder] = useState(1);

    return(
        <div className='main-content'>
          <div className='notes-container'>
            <Folders
                folders={folders}
                setFolders={setFolders}
                activeFolder={activeFolder}
                setActiveFolder={setActiveFolder}
                setNotes={setNotes}
            />
            <Notes
                activeFolder={activeFolder}
                folders={folders}
                setFolders={setFolders}
                notes={notes}
                setNotes={setNotes}
            />
          </div>
        </div>
    )
}

export default App;