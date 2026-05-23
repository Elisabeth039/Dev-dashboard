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

    const calculateProjectDates = (folderId) => {
        let totalDays = 0;
        let completionDates = [];

        notes.forEach(note =>{
           if (note.folder === (folderId)) {

           if (note.lastChange) {
            const parsedDate = Date.parse(note.lastChange);
            if (!isNaN(parsedDate)){
                completionDates.push(new Date(parsedDate));
            } 
           }

           note.content?.forEach(block => {
            if (block.type === 'time' && block.text) {
                const days = parseInt(block.text, 10);
                if (!isNaN(days)) {
                    totalDays += days;
                }
            }
           });
          }
        });

        if (completionDates.length === 0) {
            return 'No tasks started';
        }

        const startDate = new Date(Math.min(...completionDates.map(d => d.getTime())));

        const deadlineDate = new Date(startDate.getTime())
        deadlineDate.setDate(startDate.getDate() + totalDays);

        const start = startDate.toLocaleDateString('uk-UA');
        const finish = deadlineDate.toLocaleDateString('uk-UA');

        return {
            dates: `${start} - ${finish}`,
            deadline: deadlineDate
        }
    };

    const daysLeft = (deadlineDate) => {
        const today = new Date();
        const diffDays = Math.ceil(
            (deadlineDate - today) /
            (1000 * 60 * 60 * 24)
        );

        return `${diffDays}`;
    }

    return(
        <div className='project-stats'>
            <div>
              <div className='label'>
                <p className='label-txt'>Active Projects</p>
                <p className='project-icon'>P</p>
              </div>
            <div className='active-projects'>
                {folders
                .filter(folder => folder.id !== 1)
                .filter(folder => folder.project === true)
                .map(folder => {
                    const projectData = calculateProjectDates(folder.id)
                    return (
                    <div key={folder.id} className='project'>
                        <div className='pr-info'>
                        <p className='pr-name'>{folder.name}</p>
                        <p>{projectData.dates}</p>
                        </div>
                        <div className='stat tsk-stat'>
                            <p className='stat-p'>Tasks:</p>
                            <p className='completed-tsks'>{taskAmount(folder.id)}</p>
                        </div>
                        <div className='stat deadline-stat'>
                            <p className='stat-p'>Deadline in</p>
                            <p className='days-till-deadline'>{daysLeft(projectData.deadline)}</p>
                            <p className='dl-sec-p'>days</p>
                        </div>
                        </div>
                )})}
            </div>
            </div>
        </div>
    )
}