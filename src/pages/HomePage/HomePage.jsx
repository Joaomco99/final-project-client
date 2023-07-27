import "./HomePage.css";

import React from 'react';

function App() {
  return (
    <React.Fragment>
      <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;600&display=swap" rel="stylesheet" />
      <style>
        {`
          .custom-font {
            font-family: 'Rubik', sans-serif;
          }
        `}
      </style>

      <div className="welcome_to_page_container">
        <img className="welcome_image" src="https://i.ibb.co/rbt35Wz/IMG-5702.jpg" alt="welcome" />

        <br /><br />
        <h1 className="welcome_to_page_text">
          <span className="first_line">
            Welcome to Photo<span className="Hub">Hub!</span>
          </span>
        </h1>
        <p className="Welcome_text">
          Welcome to Photohub, the ultimate app for photographers, designers, and artists of all kinds. </p> <p className="Welcome_text"> With Photohub, you have a dedicated space to showcase your unique creations and connect with a vibrant community of like-minded individuals!</p>
          <p className="Xan13">© 2023 PhotoHub from Xan13</p>
      </div>
        <footer>
      </footer>
    </React.Fragment>
  );
}

export default App;



