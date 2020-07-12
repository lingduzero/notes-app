const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => {
    return 'Your Notes';
}

const addNote = (title, body) => {
    const notes = loadNotes();
    const deplicateNote = notes.find((note) => note.title === title);

    if(!deplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes);
        console.log('New Note Added!!')
    } else {
        console.log('Note title Token!!')
    }
}

const removeNote = (title) => {
    const notes = loadNotes();
    const notesToKeep = notes.filter((note) => note.title !== title);

    if(notes.length > notesToKeep.length) {
        saveNotes(notesToKeep); 
        console.log(chalk.green.inverse('Note Removed!'));
    } else {
        console.log(chalk.red.inverse('No Note Found!'));
    } 
}

const readNote = (title) => {
    const notes = loadNotes();
    const note = notes.find((note) => note.title === title);

    if(note) {
        console.log(chalk.inverse(note.title));
        console.log(note.body);
    } else {
        console.log(chalk.red.inverse('Note Not Found!'));
    } 
}

const listNotes = () => {
    console.log(chalk.inverse('Your Notes'));
    const notes = loadNotes();
    notes.forEach((note) => {
        console.log(note.title);
    });
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return  JSON.parse(dataJSON);   
    } catch(e) {
        return [];
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);  
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote,
}
