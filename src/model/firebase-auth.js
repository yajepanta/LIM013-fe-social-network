export const logIn = (email, paswword) => {
  firebase.auth().signInWithEmailAndPassword(email, paswword);
};
