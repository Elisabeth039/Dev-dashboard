import { useState } from 'react';
import '../App.css';
import '../styles/Stats.css'

export default function Stats ({notes, folders}) {

    const taskAmount = (folderId) =>{
        let total = 0;
        let completed = 0;

        notes.forEach(note => {
            if (note.folder === folderId) {
                note.content.forEach(block => {
                    if (block.type === 'checkbox') {
                        total++;

                        if(block.checked) {
                            completed++;
                        }
                    }
                });
            }
        });

        return`${completed}/${total}`;
    };

    return(
        <div className='project-stats'>
            <div>
            <p className='label'>Active Projects</p>
            <div className='active-projects'>
                {folders
                .filter(folder => folder.id !== 1)
                .map(folder => (
                    <div key={folder.id} className='project'>
                        <div className='pr-info'>
                        <p className='pr-name'>{folder.name}</p>
                        </div>
                        <div class='stat tsk-stat'>
                            <p className='stat-p'>Tasks:</p>
                            <p className='completed-tsks'>{taskAmount(folder.id)}</p>
                        </div>
                        <div className='stat'>

                        </div>
                        </div>
                ))}
            </div>
            </div>
        </div>
    )
}