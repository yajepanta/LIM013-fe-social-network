//  Crea un nuevo usuario
export const createUser = (id, userName, userPhoto, userGrade, userEmail, userLevel, userCampus) => firebase.firestore().collection('users').doc(id).set({
  name: userName,
  grade: userGrade,
  photo: userPhoto,
  email: userEmail,
  level: userLevel,
  campus: userCampus,
});

// Lee los datos de un usuario
export const dataUser = usuario => firebase.firestore().collection('users').doc(usuario).get();

// Verificamos que haya un usuario logeado y tenga acceso reciena la app
export const validationUser = callback => firebase.auth().onAuthStateChanged((user) => {
  let route = '#/';
  if (window.location.hash === '#/Registro') route = '#/Registro';
  if (user) {
    route = window.location.hash;
  }
  return callback(route);
});
