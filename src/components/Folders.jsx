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

    return(
        <div className='folders-container'>
            <input
            type='text' placeholder=' ⌕ Search notes...' className='search'> 
            </input>
            <div className='folders'>
                <button 
                 onClick={() => setIsOpen(true)}
                 className='pill'
                 >🗀</button>
                {folders.map(folder =>(
                    <button key={folder.id} className={`pill ${
                        activeFolder === folder.name ? "active" : ""
                    }`}
                    onClick={() => setActiveFolder(folder.name)}>
                        {folder.name}
                    </button>
                ))}
            </div>
            
            { isOpen && (
        <div className='add-folder-panel'>
            <input
            type='text'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className='add-input'
            />
            <button className='add-folder' onClick={addFolder}>Add folder</button>
        </div>
    )}
        </div>
    )
}