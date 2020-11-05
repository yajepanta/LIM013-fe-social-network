/* import { storage } from '../main.js' */
/* Crea usuario, el documento recibe el nombre del id */
export const createUser = (id, name, email, photo, grade, campus) => firebase.firestore()
  .collection('users').doc(id).set({
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
export const dataUser = id => firebase.firestore().collection('users').doc(id).get();

export const createPost = (id, userName, date, contentPost, imgPost, userPhoto, privacy) => firebase.firestore().collection('posts').doc().set({
  user: id,
  name: userName,
  date,
  content: contentPost,
  img: imgPost,
  photo: userPhoto,
  privacy,
});

// Cuando se terminó el inicio de sesión, ya puede acceder a todo
export const validationUser = callback => firebase.auth().onAuthStateChanged((user) => {
  let route = '';
  if (window.location.hash === '#/Registro') route = '#/Registro';
  if (user) {
    route = window.location.hash;
  }
  return callback(route);
});

export const deletePost = postId => firebase.firestore().collection('posts').doc(postId).delete();

export const editTextPost = (postId, content, privacy) => firebase.firestore().collection('posts')
  .doc(postId).update({
    content,
    privacy,
  });

export const allPosts = (callback) => {
  firebase.firestore().collection('posts')
    .orderBy('date', 'desc')
    .onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        callback(doc);
      });
    });
};

// Para subir un archivo a Cloud Storage, primero debes crear una referencia a la ruta
// de acceso completa del archivo, incluido el nombre.
/* export const uploadFile = (user, file) => {
  const uploadTask = storage.ref.child(`/${user}/${file.name}`).put(file);
  return uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
    console.log('File available at', downloadURL);
  });
}; */
