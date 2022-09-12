const express = require('express');
const cors = require('cors');
const Database = require('better-sqlite3');
/* const { query, query } = require('express'); */


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
  //console.log(`Server listening at http://localhost:${serverPort}`);
});

server.get('/movies/', (req, res) => {
  // preparamos la query
  const query = db.prepare('SELECT * FROM movies');
  // ejecutamos la query
  const response = query.all();
  //console.log(response);
  res.json({ success: true, movies: response })
});


server.post('/login', (req, res) => {

  // preparamos la query
  const query = db.prepare(
    'SELECT * FROM users WHERE email = ? AND password = ?'
  );
  //console.log(query);
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
  //console.log(foundMovie);

});

server.post('/sign-up', (req, res) => {
  const emailVerify = db.prepare(
    'SELECT * FROM users WHERE email = ?'
  )
  const user = emailVerify.get(req.body.email);
  //console.log(user);
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

server.post('/user/profile', (req, res) => {
  const query = db.
    prepare('UPDATE users SET name = ? , email = ?, password = ? WHERE id = ?');
  query.run(req.body.data.name, req.body.data.email, req.body.data.password, req.headers.userId)
  res.json({ success: true })
})

/* server.get('/user/movies', (req, res) => {
  const movieIdsQuery = db.prepare(
    'SELECT movieId FROM rel_movies_users WHERE userId = ?'
  );
  const movieIds = movieIdsQuery.all(req.header('user-id'));

  console.log( movieIds);
  
  res.json({
    success: true,
    movies: []
  })
}) */

server.get('/user/movies', (req, res) => {
  // preparamos la query para obtener los movieIds
  const movieIdsQuery = db.prepare(
    'SELECT movieId FROM rel_movies_users WHERE userId = ?'
  );
  // obtenemos el id de la usuaria
  const userId = req.header('user-id');
  // ejecutamos la query
  const movieIds = movieIdsQuery.all(userId); // que nos devuelve algo como [{ movieId: 1 }, { movieId: 2 }];

  // obtenemos las interrogaciones separadas por comas
  const moviesIdsQuestions = movieIds.map((id) => '?').join(', '); // que nos devuelve '?, ?'
  // preparamos la segunda query para obtener todos los datos de las películas
  const moviesQuery = db.prepare(
    `SELECT * FROM movies WHERE id IN (${moviesIdsQuestions})`
  );

  // convertimos el array de objetos de id anterior a un array de números
  const moviesIdsNumbers = movieIds.map((movie) => movie.movieId); // que nos devuelve [1.0, 2.0]
  // ejecutamos segunda la query
  const movies = moviesQuery.all(moviesIdsNumbers);

  // respondemos a la petición con
  res.json({
    success: true,
    movies: movies,
  });
});


const staticServer = './src/public-react';
server.use(express.static(staticServer));

const staticImagesServer = './src/public-movies-images';
server.use(express.static(staticImagesServer));

/* 
server.get('*', (req, res) => {
  res.send('<p>No hay nada aquí</p>')
})
 */