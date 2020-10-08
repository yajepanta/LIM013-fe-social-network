
/* const storageRef = firebase.storage().ref('/'); */

/* Crea usuario, el documento recibe el nombre del id */
export const createUser = (id, name, email, photo, grade, description) => firebase.firestore()
  .collection('usersY').doc(id).set({
    id,
    name,
    email,
    photo,
    grade,
    description,
  });

/* Obtenemos la data ya almacenada de nuestro usuario dentro de la colección UsersY.
La usamos para comprobar */
export const dataUser = id => firebase.firestore().collection('usersY').doc(id).get();

/* Se usa este observador para cada página que solicite info del usuario */
/* export const userIn = firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in.
    var displayName = user.displayName;
    var email = user.email;
    var emailVerified = user.emailVerified;
    var photoURL = user.photoURL;
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    var providerData = user.providerData;
    // ...
  } else {
    // User is signed out.
    // ...
  }
}); */

/* const user = firebase.auth().currentUser.uid; */