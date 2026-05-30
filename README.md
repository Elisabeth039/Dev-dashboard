# Dev Dashboard

Dev Dashboard is a React productivity dashboard built for organizing notes, tracking projects, and keeping everything in one place.

The app combines a flexible note system with folders, project tracking, and customizable themes while keeping the interface clean and simple. All data is stored locally using LocalStorage.

## Features

### Notes

* Create, edit, and delete notes
* Pin important notes
* Move notes between folders
* Auto-resizing text areas
* Automatic empty note cleanup
* Search through note titles and content

### Note Blocks

Notes support different block types:

* Text blocks
* Checkbox tasks
* Time blocks for estimating work duration

Checkboxes can be used for task tracking and completed notes are automatically recognized.

### Folders & Projects

* Create and delete folders
* Horizontal folder navigation
* Dedicated project folders
* Protected move logic to prevent invalid moves

Project folders include their own statistics and progress tracking.

### Today's Focus

Pinned notes appear in the **Today's Focus** section with quick previews and navigation for easier access.

### Project Stats

Projects include:

* Task completion progress
* Estimated timelines
* Deadline calculation
* Days remaining until deadline

Deadlines are calculated using project time blocks and activity dates.

### Themes

The dashboard includes multiple built-in themes with automatic saving, so the selected theme stays after refresh.

## Design

The UI was planned and designed in Figma before development.

Figma design: https://www.figma.com/design/apJOWl6IqG1yD7bw5Dm7jY/Dev-Dashboard?node-id=2-2&t=TOJL8MMPOwsloZMw-1

## Tech Stack

* React
* JavaScript
* CSS
* LocalStorage

## About

This project started as a personal dashboard and became a way to practice React, state management, UI design, and building features around real workflow habits.