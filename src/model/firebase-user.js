
/* const storageRef = firebase.storage().ref('/'); */

/* Crea usuario, el documento recibe el nombre del id */
export const createUser = (id, name, email, photo, grade, campus) => firebase.firestore()
  .collection('usersY').doc(id).set({
    id,
    name,
    email,
    photo,
    grade,
    campus,
  });

/* Obtenemos la data ya almacenada de nuestro usuario dentro de la colección UsersY.
La usamos para comprobar
Devuelve una promesa */
export const dataUser = id => firebase.firestore().collection('usersY').doc(id).get();


export const createPost = (id, userName, idPost, date, contentPost, imgPost, userPhoto) => firebase.firestore().collection('postsY').doc().set({
  user: id,
  name: userName,
  idPost,
  date,
  post: contentPost,
  img: imgPost,
  photo: userPhoto,
});


// Cuando se terminó el inicio de sesión, ya puede acceder a todo
export const validationUser = callback => firebase.auth().onAuthStateChanged((user) => {
  let route = '#/';
  if (user) {
    route = window.location.hash;
  } else {
    route = '';
  }
  return callback(route);
});

/* export const validationUser = callback => firebase.auth().onAuthStateChanged((user) => {
  let route = '';
  if (window.location.hash === '#/Registro') route = '#/Registro';
  if (user) {
    route = window.location.hash;
  }
  return callback(route);
}); */
