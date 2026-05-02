import { useState, useEffect } from 'react';
import '../App.css'; 
import '../styles/Folders.css'

export default function Folders ({ folders, setFolders, activeFolder, setActiveFolder }) {
    
    const [input, setInput] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const addFolder = () => {
        if (input.trim() === '') return;
        const folderId = Date.now();

        const newFolder = {
            id: folderId,
            name: input
        }
        setFolders (prev => [...prev, newFolder]);
        setInput('');
        setIsOpen(false);
    }; 

    const deleteFolder = (id) =>{
        setFolders(prev => prev.filter(folder => folder.id !== id));
        setNotes(prev => prev.filter(n => n.folder !== id));
      if (id === activeFolder) {
        setActiveFolder(1);
      }
    };

    return(
        <div className='folders-container'>
            <input
            type='text' placeholder=' ⌕ Search notes...' className='search'> 
            </input>
            <div className='folders'>
              { isOpen ? (
        <div className='add-folder-pill'>
            <input
            type='text'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className='add-input'
            />
            <button className='add-folder' onClick={addFolder}>Add folder</button>
        </div>
            ) : (
                <button 
                 onClick={() => setIsOpen(true)}
                 className='pill'
                 >🗀</button>
            )}
                {folders.map(folder =>(
                  <div key={folder.id} className={`pill ${
                        activeFolder === folder.id ? "active" : ""
                    }`}>
                    <p onClick={() => setActiveFolder(folder.id)} className='folder-btn'>
                        {folder.name}
                    </p>
                    { folder.id !== 1 && (
                    <button className='folder-close-btn' onClick={() => deleteFolder(folder.id)}>✕</button>
                    )}
                  </div>
                ))}
            </div>
        </div>
    )
}