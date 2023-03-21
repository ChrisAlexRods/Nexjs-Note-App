import { useState, useEffect } from 'react';

const NoteForm = ({ onSubmit, onUpdate, isEditing, note, onCancel }) => {
  const [content, setContent] = useState('');

  useEffect(() => {
    if (isEditing) {
      setContent(note.content);
    }
  }, [isEditing, note]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      onUpdate(note.id, content);
      onCancel();
    } else {
      onSubmit(content);
    }

    setContent('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <div>
        <button type="submit">{isEditing ? 'Update' : 'Add'} Note</button>
        {isEditing && <button type="button" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
};

export default NoteForm;
