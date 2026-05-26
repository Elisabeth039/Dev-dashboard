import { useMemo, useRef, useState } from 'react';
import '../App.css'; 
import '../styles/TodayFocus.css'

export default function TodayFocus ({notes, folders, onOpenNote, setTheme}) {

const [currentIndex, setCurrentIndex] = useState(0);

const pinnedNotes = useMemo(() => {
    return notes
        .filter(note => note.pinned === true)
        .sort((a, b) => new Date(b.lastChange) - new Date(a.lastChange));
}, [notes]);



const folderName = (folderId) => {
    const folder = folders.find(f => f.id === folderId);
    return folder ? folder.name : 'Unknown';
};



const getPreview = (content) => {
    if (!content || content.length === 0) return 'Empty note'

    for (const block of content) {
        if (block.text.length !== 0){
            const text = block.text.trim();
            return text.length > 80 ? text.substring(0, 80) + '...' : text;
        }
    };

    return 'No text content';
};



const currentNote = pinnedNotes[currentIndex];



    return(
        <div className='today-focus-section'>
          <div className='tf-top'>
            <div className='label'>
                <p className='tf-label'>Today's Focus</p>
            </div>
            <div className='theme-btns'>
                <button className='theme-btn' onClick={() => setTheme('sakura-night-theme')}>Sakura</button>
                <button className='theme-btn' onClick={() => setTheme('lavender-fog-theme')}>Fog</button>
                <button className='theme-btn' onClick={() => setTheme('graphite-gold-theme')}>Gold</button>
                <button className='theme-btn' onClick={() => setTheme('forest-theme')}>Forest</button>
                <button className='theme-btn' onClick={() => setTheme('ocean-ink-theme')}>Ocean</button>
                <button className='theme-btn' onClick={() => setTheme('sage-rose-theme')}>Rose</button>
            </div>
          </div>
            <div className='pinned-note'>
                {pinnedNotes.length === 0 ? (
                    <p className='no-pinned'>No pinned notes yet</p>
                ) : (
                    <div className='tf-pinned-note'>
                      <button className='btn-up'
                      style={{visibility: pinnedNotes.length === 1 ? 'hidden' : ''}}
                              onClick={() => 
                                setCurrentIndex(prev =>
                                    prev === 0
                                    ? pinnedNotes.length -1
                                    : prev -1
                                )
                              }>^</button>
                        <div className='note-info' onClick={() => onOpenNote(currentNote)}>
                          <div className='folder-title'>
                            <p className='pinned-folder'>{folderName(currentNote.folder)} 🗀</p>
                            <p className='pinned-title'>{currentNote.title? 
                                currentNote.title.length > 30 ? currentNote.title.substring(0, 30) + '...' 
                                                              : currentNote.title 
                                                              : 'Untitled Note'}</p>
                          </div>

                          <p className='pinned-content'>Content: {getPreview(currentNote.content)}</p>
                        </div>
                        <button className='btn-down' 
                        style={{visibility: pinnedNotes.length === 1 ? 'hidden' : ''}}
                                onClick={() => 
                                    setCurrentIndex(prev =>
                                        prev === pinnedNotes.length -1
                                        ? 0
                                        : prev +1
                                    )
                        }>⌄</button>
                        </div>
                    )}
            </div>
        </div>
    )

};