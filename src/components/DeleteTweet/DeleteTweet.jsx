import React from 'react';

function DeleteTweet({ handleDelete }) {
  return (
    <button className='button-21' onClick={handleDelete}>Delete</button>
  );
}

export default DeleteTweet;
