import React, { useState } from 'react';

function EditTweet({ tweet, handleEdit }) {
  const [editedContent, setEditedContent] = useState(tweet.message);

  const handleSave = () => {
    handleEdit(tweet._id, editedContent);
  };

  return (
    <div className='Edit'>
      <textarea className='tweet-edit' value={editedContent} onChange={(e) => setEditedContent(e.target.value)} />
      <button className='button-21' onClick={handleSave}>Save</button>
    </div>
  );
}

export default EditTweet;
