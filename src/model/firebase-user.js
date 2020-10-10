
/* const storageRef = firebase.storage().ref('/'); */

/* Crea usuario, el documento recibe el nombre del id */
export const createUser = (uid, name, email, photo, grade, campus) => firebase.firestore()
  .collection('usersY').doc(uid).set({
    uid,
    name,
    email,
    photo,
    grade,
    campus,
  });

/* Obtenemos la data ya almacenada de nuestro usuario dentro de la colección UsersY.
La usamos para comprobar
Devuelve una promesa */
export const dataUser = uid => firebase.firestore().collection('usersY').doc(uid).get();

/* export const user = firebase.auth().currentUser.uid; */

// Verificamos que haya un usuario logeado y tenga acceso recién  la app
/* export const validationUser = callback => firebase.auth().onAuthStateChanged((user) => 
{  let route = '#/';
  if (window.location.hash === '#/Registro') { route = '#/Registro'; }
  if (user) {
    route = window.location.hash;
  }
  return callback(route);
});
 */

