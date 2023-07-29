import React, { useContext, useState, useEffect } from 'react';
import './ProfilePage.css';
import tweetsService from '../../services/tweets.service';

import { AuthContext } from '../../context/auth.context';
import Tweet from '../../components/Tweet/Tweet';
import EditTweet from '../../components/EditTweet/EditTweet';
import DeleteTweet from '../../components/DeleteTweet/DeleteTweet';

function ProfilePage() {
    const { isLoggedIn, user } = useContext(AuthContext);
    const [editingTweetId, setEditingTweetId] = useState(null);
    const [tweetsArray, setTweetsArray] = useState([])
    

    const handleGetUserTweets = async () => {
        const tweets = await tweetsService.getByUser();
        console.log("Tweets array: " + JSON.stringify(tweets.data));

        setTweetsArray(tweets.data);
      };
    
      useEffect(() => {
        handleGetUserTweets()
      }, []);

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
        <div>
            <div className='Total'>
              <div className='user-handles'>
                 {user.name}
                </div>
            <div className='user-info'>
                @{user.name} &nbsp;
              </div>
              </div>
            

            <div className="feed">
            {isLoggedIn && (
                <div className='submit-area'>
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
        </div>
    );
}

export default ProfilePage;