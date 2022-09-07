const express = require('express');
const cors = require('cors');
const data = require('./data/movies.json');

// create and config server
const server = express();
server.use(cors());
server.use(express.json());

// init express aplication
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});


server.get('/movies', (req, res) => {
  const response = {
      success: true,
      movies: data
    };
    res.json(response);
  });

  server.post('/login' , )

  const staticServer = './src/public-react';
  server.use(express.static(staticServer) );

  const staticImagesServer = './src/public-movies-images';
  server.use(express.static(staticImagesServer) );