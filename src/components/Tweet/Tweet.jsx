import React from 'react';

function Tweet({ tweet }) {
  // Destructure the tweet object to get the required data
  const { user, timestamp, message } = tweet;

  return (
    <div className="tweet">
      {/* Render the user profile image */}
    

      <div className="body">
        <div className="top">
         {/* Render the tweet message */}
         <p className="message">{message}</p>
          {/* Render the user's name and handle */}
          <span className="user">
            <span className="name">{user.name}</span>
            <span className="handle">@{user.handle}</span>
            {/* Render the tweet timestamp */}
          <span className="timestamp">{timestamp}</span>
          </span>

          
        </div>

       

        {/* Add any other components you want to display within a tweet */}
      </div>
    </div>
  );
}

export default Tweet;
