// Este es el punto de entrada de tu aplicacion
import { changeView } from './controller/router.js';
import { validationUser } from './model/firebase-user.js';

/* Configuraciones iniciales de Firebase */
/* For Firebase JS SDK v7.20.0 and later, measurementId is optional */

const firebaseConfig = {
  apiKey: 'AIzaSyAAt9Qsfp8EhbBvCwaUxC4qhtWrwu8vdrA',
  authDomain: 'innova-social.firebaseapp.com',
  databaseURL: 'https://innova-social.firebaseio.com',
  projectId: 'innova-social',
  storageBucket: 'innova-social.appspot.com',
  messagingSenderId: '178442920943',
  appId: '1:178442920943:web:8bf7721b2cccf0b6f24c1a',
  gs: '//innova-social.appspot.com/img',
};

// Initialize Firebase. Todas las llamadas a firebase deben ser después de este incio
firebase.initializeApp(firebaseConfig);
// Get a non-default Storage bucket
/* export const storage = firebase.app().storage('gs://imgY'); */


const initialize = () => {
  validationUser(changeView);
};

window.addEventListener('load', initialize);
window.addEventListener('hashchange', initialize);
