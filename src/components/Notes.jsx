import { useState, useEffect, useRef } from 'react';
import '../App.css';
import '../styles/Notes.css';

export default function Notes({ activeFolder, folders, notes, setNotes, externalNote, searchQuery }) {

    const [noteTitle, setNoteTitle] = useState('');
    const [noteContent, setNoteContent] = useState([]);
    const [noteOpen, setNoteOpen] = useState(false);
    const [selectedNote, setSelectedNote] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const [moveTo, setMoveTo] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const textareaRef = useRef([]);
    const titleRef = useRef(null);
    const [changeTime, setChangeTime] = useState('');
  


    const addNote = () => {
        const isEmpty = noteContent.every(
            block => block.text.trim() === ''
        );
        
        if (noteTitle.trim() === '' && isEmpty) {
            if (selectedNote) {
                setNotes(prev =>
                    prev.filter(note => note.id !== selectedNote.id)
                );
            }
            setNoteOpen(false);
            setSelectedNote(null);
            setNoteContent([]);
            setNoteTitle('');
            
            return;
        }

        if (selectedNote) {
            setNotes(prev =>
                prev.map(n =>
                    n.id === selectedNote.id
                        ? { ...n, title: noteTitle,
                            content: noteContent,
                            lastChange: new Date().toLocaleString() }
                        : n
                )
            );
        } else {
            const newNote = {
                id: Date.now(),
                title: noteTitle,
                content: noteContent,
                folder: activeFolder,
                pinned: false,
                lastChange: new Date().toLocaleString(),
                completed: false
            };
            setNotes(prev => [...prev, newNote]);
        }

        setSelectedNote(null);
        setNoteTitle('');
        setNoteContent([]);
        setNoteOpen(false);
        setMenuOpen(false);
    };



    const openNote = (note) => {
        setSelectedNote(note);
        setNoteTitle(note.title);
        setNoteContent(note.content);
        setNoteOpen(true);
    };



    const deleteNote = () => {
        if (selectedNote) {
            setNotes(prev => prev.filter(note => note.id !== selectedNote.id));
        }
        setSelectedNote(null);
        setNoteTitle('');
        setNoteContent([]);
        setMenuOpen(false);
        setNoteOpen(false);
    };



    const moveNote = (folderName) => {
        if (!selectedNote) return;

        setNotes(prev =>
            prev.map(n =>
                n.id === selectedNote.id
                    ? { ...n, folder: folderName }
                    : n
            )
        );

        setMoveTo(false);
        setMenuOpen(false);
    };



    const addTextBlock = () => {
        const newBlock = { id: Date.now(), type: 'text', text: '' };

        setNoteContent(prev => {
            const updated = [...prev];
            updated.splice(activeIndex + 1, 0, newBlock);
            return updated;
        });
    };



    const addCheckboxBlock = () => {
        const newBlock = {
            id: Date.now(),
            type: 'checkbox',
            text: '',
            checked: false
        };

        setNoteContent(prev => {
            const updated = [...prev];
            updated.splice(activeIndex + 1, 0, newBlock);
            return updated;
        });

        setTimeout(() => {
                textareaRef.current[activeIndex + 1]?.focus();
            }, 0)
    };



    const addTimeBlock = () =>{
        const newBlock = {
            id: Date.now(),
            type: 'time',
            text: ''
        };

        setNoteContent(prev => {
            const updated = [...prev];
            updated.splice(activeIndex + 1, 0, newBlock);
            return updated;
        });

        setTimeout(() => {
                textareaRef.current[activeIndex + 1]?.focus();
            }, 0);
    }



    const updateBlockText = (id, value) => {
        setNoteContent(prev =>
            prev.map(block =>
                block.id === id ? { ...block, text: value } : block
            )
        );
    };



    const autoResize = (e) => {
        e.target.style.height = 'auto';
        e.target.style.height = e.target.scrollHeight + 'px'
    }



    useEffect(() => {
        textareaRef.current.forEach(textarea =>{
            if (textarea) {
                textarea.style.height = 'auto';
                textarea.style.height = textarea.scrollHeight + 'px';
            }
        });
    }, [noteContent, noteOpen]);



    useEffect(() => {
            if (titleRef.current) {
                titleRef.current.style.height = 'auto';
                titleRef.current.style.height = titleRef.current.scrollHeight + 'px';
            }
        }, [noteTitle, noteOpen]);



        useEffect(() =>{
            if (externalNote) {
                setSelectedNote(externalNote);
                setNoteTitle(externalNote.title);
                setNoteContent(externalNote.content || []);
                setNoteOpen(true);
            }
        }, [externalNote]);



    const toggleCheckbox = (id) => {
        setNoteContent(prev =>
            prev.map(block =>
                block.id === id
                    ? { ...block, checked: !block.checked }
                    : block
            )
        );
    };



    const handleEnter = (e, index) => {
        if (e.key === 'Enter') {
            e.preventDefault();

            const newBlock = { id: Date.now(), type: 'text', text: '' };

            setNoteContent(prev => {
                const updated = [...prev];
                updated.splice(index + 1, 0, newBlock);
                return updated;
            });

            setTimeout(() => {
                textareaRef.current[index + 1]?.focus();
            }, 0)
        }
    };



    const handleBackspace = (e, block, index) => {
        if (e.key === 'Backspace'&& (!block.text || block.text === '') && noteContent.length > 1) {
            e.preventDefault();

            setNoteContent(prev => prev.filter((_, i) => i !== index));

            setTimeout(() => {
                textareaRef.current[index - 1]?.focus();
            }, 0)
        }
    };


    
    const pinNotes = (id) =>{
        setNotes(prev =>
            prev.map(note =>
                note.id === id
                ? {...note, pinned: !note.pinned}
                : note
            )
        )
    };



   const isCompleted = (noteContentArray) => {
    const checkboxes = noteContentArray.filter(block => block.type === 'checkbox');
    if (checkboxes.length === 0) return false;
    return checkboxes.every(block => block.checked);
   };



    const searchWords = searchQuery
        .toLowerCase()
        .trim()
        .split(' ')
        .filter(word => word !== ' ');



    return (
        <div className='notes-section'>

        {noteOpen ? (
        <div className='note'>

        <div className='functions-panel'>
            <button className='function' onClick={addCheckboxBlock}>☑</button>
            <button className='function' onClick={addTimeBlock}>T</button>
            <button className='function'><b>B</b></button>
            <button className='function-highlight'>H</button>
        </div>

        <div className='note-area'>

        <div className='title'>
            <button onClick={addNote} className='close-note'>{"<"}</button>

        {isCompleted(noteContent) && (
                <span className='completed-emoji'>✅</span>
            )}

        <textarea
            value={noteTitle}
            ref={titleRef}
            onChange={(e) => {setNoteTitle(e.target.value);
                autoResize(e);
            }}
            maxLength="75"
            placeholder='Title'
            className='note-title'
         />

        <button 
            disabled={selectedNote === null}
            onClick={() => {
            if (selectedNote){
            setMenuOpen(prev => !prev);
            setMoveTo(false);
            }}}
            className='three-dots'
        >⋮</button>

        {menuOpen && (
            <div className='menu'>
                <button className='menu-btn' onClick={() => { if (selectedNote) {pinNotes(selectedNote.id);} setMenuOpen(false)}}>{selectedNote.pinned === true ? 'Unpin note' : 'Pin note'}</button>
                <button className='menu-btn' onClick={() => {setMoveTo(true); setMenuOpen(false)}}>Move to →</button>
                <button className='menu-btn' onClick={deleteNote}>Delete</button>
            </div>
        )}

        {moveTo && (
            <div className='menu'>
                <p className='moveTo-text'>Move this note to...</p>
                    {folders.map(folder => (
                <button
                key={folder.id}
                className='menu-btn'
                onClick={() => moveNote(folder.id)}
                >
                {folder.name}
                </button>
                ))}
            </div>
        )}
            </div>
                <p className='last-change'>{selectedNote?.lastChange}</p>
                <div className='note-content'>
                {noteContent.map((block, index) => (
                <div key={block.id} className='blocks'>

                {block.type === 'checkbox' && (
                <button
                onClick={() => toggleCheckbox(block.id)}
                className={block.checked ? 'checked-box' : 'checkbox'}>
                ✔
                </button>
                )}

                {block.type === 'time' ? (
                    <div className='time-block'>
                        <p className='time-label'>Time:</p>
                        <input
                        type='number'
                        value={block.text}
                        placeholder='0'
                        className='time-input'
                        ref={(el) => textareaRef.current[index] = el}
                        onChange={(e) => {

                            const value = e.target.value;
                            if (value.length <= 1){
                            updateBlockText(block.id, e.target.value);
                            }
                        }}
                        onFocus={() => setActiveIndex(index)}
                        onKeyDown={(e) => {
                            handleEnter(e, index);
                            handleBackspace(e, block, index);
                        }}
                        />
                        <p>days</p>
                    </div>
                ) : (

            <textarea
                value={block.text}
                ref={(el) => textareaRef.current[index] = el}
                onChange={(e) => {
                    updateBlockText(block.id, e.target.value);
                    autoResize(e);
                }}
                onFocus={() => setActiveIndex(index)}
                onKeyDown={(e) => {
                    handleEnter(e, index);
                    handleBackspace(e, block, index);
                }}
                placeholder={ index === 0 && block.length < 2 ? 'Write something...' : ''}
                className={
                    block.type === 'checkbox' && block.checked
                    ? 'text-block-checked'
                    : 'text-block'
                }
                rows={1}
            />
                )}
            </div>
            ))}
        </div>
    </div>
</div>
    ) : (
    <>
    <div className='note-list'>
        {notes
        .filter(note =>
        activeFolder === 1
        ? true
        : note.folder === activeFolder
        )
        .filter(note => {
            const noteText = (
                note.title + ' ' +
                note.content.map(block => block.text).join(' ')
            ).toLowerCase();

            return searchWords.every(word =>
                noteText.includes(word)
            );
        })
        .sort((a, b) => {
            if (b.pinned !== a.pinned){
                return b.pinned - a.pinned;
            };
            return isCompleted(a.content) - isCompleted(b.content);
        })
        .map(note => (
        <div
            key={note.id}
            className='list-note'
            onClick={() => openNote(note)}
        >
        <p className='shown-title'>{isCompleted(note.content) ? '✅' : ''}{note.title === '' ? 'New Note' : note.title}</p>
        <div>{note.pinned ? '📌' : ''}</div>
        </div>
         ))}
    </div>
        <div
            className='add-note-btn'
            onClick={() => {
                setNoteContent([
                  { id: Date.now(), type: 'text', text: '' }
                ]);
                setSelectedNote(null);
                setNoteTitle('');
                setNoteOpen(true);
            }}
        >
            +
        </div>
    </>
        )}
    </div>
);}