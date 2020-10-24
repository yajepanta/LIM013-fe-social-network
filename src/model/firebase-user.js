/* import { storage } from '../main.js' */
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

export const createPost = (id, userName, date, contentPost, imgPost, userPhoto) => firebase.firestore().collection('postsY').doc().set({
  user: id,
  name: userName,
  date,
  content: contentPost,
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


export const deletePost = postId => firebase.firestore().collection('postsY').doc(postId).delete();

export const editTextPost = (postId, content) => firebase.firestore().collection('postsY')
  .doc(postId).update({
    content,
  });
/* export const validationUser = callback => firebase.auth().onAuthStateChanged((user) => {
  let route = '';
  if (window.location.hash === '#/Registro') route = '#/Registro';
  if (user) {
    route = window.location.hash;
  }
  return callback(route);
}); */

// Para subir un archivo a Cloud Storage, primero debes crear una referencia a la ruta
// de acceso completa del archivo, incluido el nombre.
/* export const uploadFile = (user, file) => {
  const uploadTask = storage.ref.child(`/${user}/${file.name}`).put(file);
  return uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
    console.log('File available at', downloadURL);
  });
}; */
