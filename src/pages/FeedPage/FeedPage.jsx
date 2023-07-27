// FeedPage.jsx

import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/auth.context';
import Tweet from '../../components/Tweet/Tweet';
import EditTweet from '../../components/EditTweet/EditTweet';
import DeleteTweet from '../../components/DeleteTweet/DeleteTweet';
import './FeedPage.css';
import tweetsService from '../../services/tweets.service';


function FeedPage() {
  const { isLoggedIn, user } = useContext(AuthContext);
  const [tweetContent, setTweetContent] = useState('');
  const [editingTweetId, setEditingTweetId] = useState(null);
  const [tweetsArray, setTweetsArray] = useState([])

  /*let tweetsArray = [
    { user: {handle: "buceta", name: "buceta"}, id: 1, timestamp: "01:58", message: "cona" },
    { user: {handle: "pila", name: "pila"}, id: 2, timestamp: "02:00", message: "piloca" }
  ]*/

  const handleGetTweets = async () => {
    const tweets = await tweetsService.get();
    console.log("Tweets array: " + JSON.stringify(tweets.data));
    setTweetsArray(tweets.data);
  };

  useEffect(() => {
    handleGetTweets()
    console.log("User:" + user);
  }, []);

  const handleTweetSubmit = async () => {
    if (tweetContent.trim() !== '') {
      const newTweet = {
        message: tweetContent,
      };
      
      let createdTweet = await tweetsService.create(newTweet);
      createdTweet = createdTweet.data;

      setTweetsArray(tweetsArray => [createdTweet, ...tweetsArray]);
    }
  };
  const handleEdit = async (tweetId, editedContent) => {

    let foundTweet = tweetsArray.filter(tweet => { return tweet._id === tweetId});
    foundTweet[0].message = editedContent;
    let responseTweet = tweetsService.edit(foundTweet[0]);
    
    let editedArray = tweetsArray.map(tweet => {
        if(tweet._id === tweetId) {
          console.log("Found tweet: " + tweet._id);
          console.log("Editing tweet: " + tweetId);
          console.log("Edited message: " + editedContent);
          tweet.message = editedContent;
        }
        return tweet;
    });

    setTweetsArray(editedArray);
    setEditingTweetId(null);
  };

  const handleDelete = async (tweetId) => {
    console.log("Deleted tweeted id: " + tweetId);

    await tweetsService.delete(tweetId);

    let arrayWithDeletedTweet = tweetsArray.filter(item => item._id !== tweetId);
    setTweetsArray(arrayWithDeletedTweet);  
  };
  return (
    <div className="feed">
      {isLoggedIn && (
        <div className='submit-area'>
          <textarea
            className="tweet-input"
            value={tweetContent}
            onChange={(e) => setTweetContent(e.target.value)}
            placeholder="What's happening?"
          />
          <button className="button-21" onClick={handleTweetSubmit}>
            Tweet
          </button>
          {tweetsArray ? tweetsArray.map((tweet) => (
        <div className='tweetbox' key={tweet._id}>
          {editingTweetId === tweet._id ? (
            <EditTweet tweet={tweet} handleEdit={handleEdit} />
          ) : (
            <div>
              <Tweet tweet={tweet} />
              {isLoggedIn && user.name === tweet.user.handle && (
                <>
                  <button className='button-21' onClick={() => setEditingTweetId(tweet._id)}>Edit</button>
                  <DeleteTweet handleDelete={() => handleDelete(tweet._id)} />
                </>
              )}
            </div>
          )}
        </div>
      )) : <p className="message">There's no tweets yet</p>}
    </div>
      )}
    </div>
  );
  }





export default FeedPage;
