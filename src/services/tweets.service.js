import axios from "axios";

class TweetsService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_SERVER_URL || "http://localhost:5005",
    });

    // Automatically set JWT token on the request headers for every request
    this.api.interceptors.request.use((config) => {
      // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  get = () => {

    let tweets = this.api.get("/tweets");

    return tweets;
    // same as
    // return axios.get("http://localhost:5005/tweets");
  };

  create = (tweet) => {

    let createdTweet = this.api.post("/tweets", tweet);

    return createdTweet;
    // same as
    // return axios.post("http://localhost:5005/tweets");
  };

  delete = (tweetId) => {

    const deleteTweetBody = {id: tweetId}
    let result = this.api.delete("/tweets", {data: deleteTweetBody});

    return result;
    // same as
    // return axios.delete("http://localhost:5005/tweets");
  };

  edit = (tweet) => {

    let result = this.api.patch("/tweets", tweet);

    return result;
    // same as
    // return axios.patch("http://localhost:5005/tweets");
  };

  getByUser = () => {

    let result = this.api.get("/tweets/user");

    return result;
    // same as
    // return axios.patch("http://localhost:5005/tweets");
  };
}

// Create one instance (object) of the service
const tweetsService = new TweetsService();

export default tweetsService;
