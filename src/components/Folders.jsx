import { useState, useEffect, useRef } from 'react';
import '../App.css'; 
import '../styles/Folders.css'

export default function Folders ({ folders, setFolders, activeFolder, setActiveFolder, setNotes, searchQuery, setSearchQuery }) {
    
    const [input, setInput] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [isProject, setIsProject] = useState(false);
    const inputRef = useRef(null);



    const addFolder = () => {
        if (input.trim() === '') return;
        const folderId = Date.now();

        const newFolder = {
            id: folderId,
            name: input,
            project: isProject
        }
        setFolders (prev => [...prev, newFolder]);
        setInput('');
        setIsOpen(false);
        setIsProject(false)
    }; 



    const deleteFolder = (id) =>{
        setFolders(prev => prev.filter(folder => folder.id !== id));
        setNotes(prev => prev.filter(n => n.folder !== id));
      if (id === activeFolder) {
        setActiveFolder(1);
      }
    };



    useEffect(() => {
    const scrollContainer = document.querySelector('.all-folders')
    if (!scrollContainer) return;
    
    const handleWheel = (e) =>{
        e.preventDefault();
        scrollContainer.scrollBy({
            left: e.deltaY,
            behavior: 'smooth'
        });
    };

    scrollContainer.addEventListener('wheel', handleWheel);

    return () => {
        scrollContainer.removeEventListener('wheel', handleWheel);
    };
    }, []);



   useEffect(() => {
    if (isOpen && inputRef.current) {
        inputRef.current.focus();
    }
   }, [isOpen]);



    return(
        <div className='folders-container'>
            <input
            type='text' 
            placeholder=' ⌕ Search notes...' 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='search'> 
            </input>
            <div className='folders'>
                <button 
                 onClick={() => isOpen ? setIsOpen(false) : setIsOpen(true)}
                 className='pill folder-input'
                 >🗀</button>
              { isOpen && (
        <div className='add-folder-pill'>
            <button className={isProject === true ? 'add-project-active' : 'add-project'} onClick={() => setIsProject(!isProject)}>P</button>
            <input
            type='text'
            value={input}
            ref={inputRef}
            onChange={(e) => setInput(e.target.value)}
            maxLength={15}
            className='add-input'
            />
            <button className='add-folder' onClick={addFolder}>Add folder</button>
            <button className='close-btn' onClick={() => {setIsOpen(false), setIsProject(false)}}>✕</button>
        </div>
              )}
            <div className='all-folders'>
                {folders.map(folder =>(
                  <div key={folder.id} className={`pill ${
                        activeFolder === folder.id ? "active" : ""
                    }`}>
                    <p onClick={() => setActiveFolder(folder.id)} className='folder-btn'>
                        { folder.project === true ? 'P | ' + folder.name : folder.name}
                    </p>
                    { folder.id !== 1 && (
                    <button className='close-btn' onClick={() => deleteFolder(folder.id)}>✕</button>
                    )}
                  </div>
                ))}
            </div>
            </div>
        </div>
    )
}