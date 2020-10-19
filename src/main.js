// Este es el punto de entrada de tu aplicacion
import { changeView } from './controller/router.js';
import { validationUser } from './model/firebase-user.js';

/* Configuraciones iniciales de Firebase */
/* For Firebase JS SDK v7.20.0 and later, measurementId is optional */

const firebaseConfig = {
  apiKey: 'AIzaSyC9ZhlH1bwwh4Hg3cNhthVBgQi-nm3CZRI',
  authDomain: 'laboratoria-innova-social.firebaseapp.com',
  databaseURL: 'https://laboratoria-innova-social.firebaseio.com',
  projectId: 'laboratoria-innova-social',
  storageBucket: 'laboratoria-innova-social.appspot.com',
  messagingSenderId: '351018093792',
  appId: '1:351018093792:web:624d3175b4a2838cdfd485',
  measurementId: 'G-K9TCSL5QH0',
};

// Initialize Firebase. Todas las llamadas a firebase deben ser después de este incio
firebase.initializeApp(firebaseConfig);

// Get a non-default Storage bucket
const storage = firebase.app().storage('gs://imgY');

// Create a storage reference from our storage service
export const storageRef = storage.ref();

/*
export const uploadImgPost = (file, uid) => {
  const refImgPost = firebase.storage().ref(`imagePost/${uid}/${file.name}`);
  return refImgPost.put(file).then(snapshot => (snapshot.ref.getDownloadURL()));
};
const init = () => {
  changeView(window.location.hash);
  window.addEventListener('hashchange', () => changeView(window.location.hash));
};

window.addEventListener('load', init); */

const initialize = () => {
  validationUser(changeView);
};

window.addEventListener('load', initialize);
/* window.addEventListener('hashchange', initialize); */
