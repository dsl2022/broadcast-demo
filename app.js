const noteList = document.getElementById("noteList");
const noteInput = document.getElementById("noteInput");
const addNoteButton = document.getElementById("addNoteButton");
const resetNoteButton = document.getElementById("resetNoteButton");

let notes = [];
const channel = new BroadcastChannel('notes-channel');
function renderNotes(){
    noteList.innerHTML = "";
    notes.forEach(note=>{
        const noteItem = document.createElement('div');
        noteItem.textContent = note;
        noteList.appendChild(noteItem);
    })
}

addNoteButton.addEventListener('click',()=>{
    const newNote = noteInput.value.trim();
    if (newNote) {
        notes.push(newNote);
        renderNotes();
        noteInput.value = "";
    
        channel.postMessage({ action: "add", note: newNote });}

})

resetNoteButton.addEventListener('click',()=>{
    notes = [];
    renderNotes();    
    channel.postMessage({action:"reset"});
})


channel.addEventListener("message",(event)=>{
    const {action,note} = event.data;
    if(action==="add"){
        notes.push(note);
        renderNotes();
    }else if(action ==="reset"){
        notes = [];
        renderNotes();
    }
})