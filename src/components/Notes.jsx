import { useState } from 'react';
import '../App.css'; 
import '../styles/Notes.css';

export default function Notes () {
    const [folders, setFolders] = useState([
        {id: 1, name: 'All notes'},
        {id: 2, name: 'Another folder'}
    ]);

    const [activeFolder, setActiveFolder] = useState("All notes");
    const [input, setInput] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const addFolder = () => {
        if (input.trim() === '') return;

        const newFolder = {
            id: Date.now(),
            name: input
        };

        setFolders(prev => [...prev, newFolder]);
        setInput('');
        setIsOpen(false);
    }; 

    return(
        <div className='notes-container'>
            <input
                type='text'
                placeholder=' ⌕ Search notes...'
                className='search'
            />

            <div className='folders'>
                <button 
                    onClick={() => setIsOpen(true)}
                    className='pill'
                >
                    🗀
                </button>

                {folders.map(folder =>(
                    <button
                        key={folder.id}
                        className={`pill ${
                            activeFolder === folder.name ? "active" : ""
                        }`}
                        onClick={() => setActiveFolder(folder.name)}
                    >
                        {folder.name}
                    </button>
                ))}
            </div>

            <div className='notes-section'></div>

            {isOpen && (
                <div className='add-folder-panel'>
                    <input
                        type='text'
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className='add-input'
                    />
                    <button
                        className='add-folder'
                        onClick={addFolder}
                    >
                        Add folder
                    </button>
                </div>
            )}
        </div>
    );
}