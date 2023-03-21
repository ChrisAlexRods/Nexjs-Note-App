import { useState, useEffect } from "react";
import NoteForm from "../components/NoteForm";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetch("/api/notes")
      .then((res) => res.json())
      .then(setNotes);
  }, []);

  const handleAddNote = async (content) => {
    const res = await fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });
    const newNote = await res.json();
    setNotes([newNote, ...notes]);
  };

  const handleDeleteNote = async (id) => {
    await fetch(`/api/notes/${id}`, { method: "DELETE" });
    setNotes(notes.filter((note) => note.id !== id));
  };

  const handleUpdateNote = async (id, content) => {
    const res = await fetch(`/api/notes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    });
    const updatedNote = await res.json();

    setNotes(notes.map((note) => (note.id === id ? updatedNote : note)));
    setIsEditing(false);
  };

  const handleEditNote = (note) => {
    setEditingNote(note);
    setIsEditing(true);
  };

  return (
    <div className="wrapper">
      <div>
        <h1 className="text-center my-8">Note-taking App</h1>
        <div className="chalkboard">
          {notes.map((note) => (
            <div key={note.id} className="note-wrapper">
              <div className="note">
                <p
                  className="note-content"
                  onClick={() => handleEditNote(note)}
                >
                  {note.content}
                </p>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteNote(note.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="footer">
        <NoteForm
          onSubmit={handleAddNote}
          onUpdate={handleUpdateNote}
          isEditing={isEditing}
          note={editingNote}
          onCancel={() => setIsEditing(false)}
        />
      </div>
    </div>
  );

}
