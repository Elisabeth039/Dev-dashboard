import { useState } from 'react';
import './App.css';
import Folders from './components/Folders.jsx';
import Notes from './components/Notes.jsx';

function App () {
    const [folders, setFolders] = useState([
        {id: 1, name: 'All notes'},
        {id: 2, name: 'Another folder'}
    ]);

    const [activeFolder, setActiveFolder] = useState("All notes");

    return(
        <div className='main-content'>
          <div className='notes-container'>
            <Folders
                folders={folders}
                setFolders={setFolders}
                activeFolder={activeFolder}
                setActiveFolder={setActiveFolder}
            />
            <Notes
                activeFolder={activeFolder}
            />
          </div>
        </div>
    )
}

export default App;