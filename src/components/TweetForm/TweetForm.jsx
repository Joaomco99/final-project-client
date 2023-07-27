import React, { useState } from 'react';

function TweetForm({ onAddTweet }) {
  const [tweetContent, setTweetContent] = useState('');

  const handleInputChange = (event) => {
    setTweetContent(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (tweetContent.trim() === '') {
      // Do not add empty tweets
      return;
    }

    // Call the onAddTweet function with the new tweet content
    onAddTweet(tweetContent);

    // Reset the tweet content
    setTweetContent('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={tweetContent}
        onChange={handleInputChange}
        placeholder="Write your tweet..."
      />
      <button type="submit">Tweet</button>
    </form>
  );
}

export default TweetForm;
