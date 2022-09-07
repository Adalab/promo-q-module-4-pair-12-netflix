const express = require('express');
const cors = require('cors');
const data = require('./data/movies.json');
const users = require('./data/users.json');

usersList= [];

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

  server.post('/login', (req, res) => {
    {
      console.log('me llaman ');
      console.log(req.body);
      if(users.find( user => user.email === req.body.email && user.password === req.body.password)){
        console.log('si esta email');
        res.json({
          success : true,
          userId: "id_de_la_usuaria_encontrada"
        })
      }else {
        console.log('no esta bien');
        res.json({
          success: false,
          errorMessage: "Usuaria/o no encontrada/o"
        })
      }
    }
   
  } );

  const staticServer = './src/public-react';
  server.use(express.static(staticServer) );

  const staticImagesServer = './src/public-movies-images';
  server.use(express.static(staticImagesServer) );