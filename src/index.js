const express = require('express');
const cors = require('cors');
const Database = require('better-sqlite3');


// create and config server
const server = express();
server.use(cors());
server.use(express.json());
server.set('view engine', 'ejs');

const db = new Database('./src/db/database.db', { verbose: console.log });



const staticStyle = './public';
server.use(express.static(staticStyle));

// init express aplication
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

server.get('/movies/', (req, res) => {
  // preparamos la query
  const query = db.prepare('SELECT * FROM movies');
  // ejecutamos la query
  const response = query.all();
  console.log(response);
  res.json({ success: true, movies: response })
});


server.post('/login', (req, res) => {

  // preparamos la query
  const query = db.prepare(
    'SELECT * FROM users WHERE email = ? AND password = ?'
  );
  console.log(query);
  const user = query.get(req.body.email, req.body.password);
  res.json({
    "success": true,
    "userId": user.id
  })

  /*     if (query.find(user => user.email === req.body.email && user.password === req.body.password)) {
        console.log('si esta email');
        res.json({
          "success": true,
          "userId": "id_de_la_usuaria_encontrada"
        })
      } else {
        console.log('no esta bien');
        res.json({
          "success": false,
          "errorMessage": "Usuaria/o no encontrada/o"
        })
      } */
}

);


server.get('/movie/:movieId', (req, res) => {

  console.log(req.params.movieId);

  const movie = req.params.movieId;
  // preparamos la query
  const query = db.prepare(
    'SELECT * FROM movies WHERE id = ?'
  );
  // la ejecutamos indicando: SELECT * FROM users  WHERE email = 'lucia@hotmail.com' AND password = 'qwertyui'
  const foundMovie = query.get(movie);

  res.render('movie', foundMovie)
  console.log(foundMovie);

});

server.post('/sign-up', (req, res) => {
  const emailVerify = db.prepare(
    'SELECT * FROM users WHERE email = ?'
  )
  const user = emailVerify.get(req.body.email);
  console.log(user);
  if (user !== "") {
    console.log('ya esta registrada');
  } else {
    const query = db.prepare(
      'INSERT INTO users (email, password) VALUES (? , ? )'
    );
    const newUser = query.run(req.body.email, req.body.password);

    res.json({
      success: true,
      userId: newUser.id,
      data: []
    })
  }
  
})


const staticServer = './src/public-react';
server.use(express.static(staticServer));

const staticImagesServer = './src/public-movies-images';
server.use(express.static(staticImagesServer));

/* 
server.get('*', (req, res) => {
  res.send('<p>No hay nada aquí</p>')
})
 */