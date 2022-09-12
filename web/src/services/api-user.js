// login

const sendLoginToApi = data => {
  console.log('Se están enviando datos al login:', data);
  // CAMBIA ESTE FETCH PARA QUE APUNTE A UN ENDPOINT DE TU SERVIDOR, PIENSA SI DEBE SER GET O POST, PIENSA QUÉ DATOS DEBES ENVIAR, ETC
  return fetch('http://localhost:4000/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: data.email,
      password: data.password
    })
  })
    .then(response => response.json())

};

// signup

const sendSingUpToApi = data => {
  console.log('Se están enviando datos al signup:', data);
  // CAMBIA ESTE FETCH PARA QUE APUNTE A UN ENDPOINT DE TU SERVIDOR, PIENSA SI DEBE SER GET O POST, PIENSA QUÉ DATOS DEBES ENVIAR, ETC
  return fetch('//localhost:4000/sign-up', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(data => {
      return data;
    });
};

// profile

const sendProfileToApi = (userId, data) => {
  console.log('Se están enviando datos al profile:', userId, data);
  // CAMBIA ESTE FETCH PARA QUE APUNTE A UN ENDPOINT DE TU SERVIDOR, PIENSA SI DEBE SER GET O POST, PIENSA QUÉ DATOS DEBES ENVIAR, ETC
  return fetch('/user/profile', {
    method: 'POST',
    headers: {
      data: data
    },
    body: {data: data}
  })
};

const getProfileFromApi = userId => {
  console.log('Se están pidiendo datos del profile del usuario:', userId);
  // CAMBIA ESTE FETCH PARA QUE APUNTE A UN ENDPOINT DE TU SERVIDOR, PIENSA SI DEBE SER GET O POST, PIENSA QUÉ DATOS DEBES ENVIAR, ETC
  return fetch('//beta.adalab.es/curso-intensivo-fullstack-recursos/apis/netflix-v1/empty.json')
  .then(response => response.json())
  .then(data => {
     return data;
  });
};

// user movies

const getUserMoviesFromApi = userId => {
  console.log('Se están pidiendo datos de las películas de la usuaria:', userId);
  // CAMBIA ESTE FETCH PARA QUE APUNTE A UN ENDPOINT DE TU SERVIDOR, PIENSA SI DEBE SER GET O POST, PIENSA QUÉ DATOS DEBES ENVIAR, ETC
  return fetch('/user/movies',  {
    method: 'GET',
    headers: {'user-id': userId}
  })
  .then(response => response.json())
  .then(data => {
     return data;
  });
};

const objToExport = {
  sendLoginToApi: sendLoginToApi,
  sendSingUpToApi: sendSingUpToApi,
  sendProfileToApi: sendProfileToApi,
  getProfileFromApi: getProfileFromApi,
  getUserMoviesFromApi: getUserMoviesFromApi
};

export default objToExport;
