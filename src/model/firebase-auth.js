export const logIn = (email, paswword) => firebase.auth()
  .signInWithEmailAndPassword(email, paswword);

export const logOut = () => firebase.auth().signOut();
