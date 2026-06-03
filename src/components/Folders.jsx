import { useState, useEffect, useRef } from 'react';
import '../App.css'; 
import '../styles/Folders.css'

export default function Folders ({ folders, setFolders, activeFolder, setActiveFolder, setNotes, searchQuery, setSearchQuery }) {
    
    const [input, setInput] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [isProject, setIsProject] = useState(false);
    const inputRef = useRef(null);
    const [deleteWarning, setDeleteWarning] = useState(false);
    const [folderToDelete, setFolderToDelete] = useState(null);



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



    const deleteFolder = () =>{
      if(!folderToDelete) return;
        setFolders(prev => prev.filter(folder => folder.id !== folderToDelete));
        setNotes(prev => prev.filter(n => n.folder !== folderToDelete));
      if (folderToDelete === activeFolder) {
        setActiveFolder(1);
      };

      setFolderToDelete(null);
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
            <button className='close-btn' onClick={() => {setIsOpen(false); setIsProject(false)}}>✕</button> 
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
                    <button className='close-btn'  onClick={() => {setFolderToDelete(folder.id); setDeleteWarning(true)}}>✕</button>
                    )}
                  </div>
                ))}
            </div>
            { deleteWarning && (
              <div className={`backdrop ${ deleteWarning ? 'show' : ''}`} onClick={() => {setDeleteWarning(false); setFolderToDelete(null);}}>
                <div className='delete-warning'>
                    <p className='dw-text'> Are you sure you wanna delete this folder?</p>
                    <div className='dw-btns'>
                    <button className='dw-delete' onClick={() => {deleteFolder(); setDeleteWarning(false); setBackdropOpen(false)}}>Delete</button>
                    <button className='dw-cancel' onClick={() => {setDeleteWarning(false); setFolderToDelete(null)}}>Cancel</button>
                    </div>
                </div>
              </div>
            )}
            </div>
        </div>
    )
}