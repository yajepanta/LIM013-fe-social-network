// Este es el punto de entrada de tu aplicacion
import { changeView } from './controller/router.js';

const initialize = () => {
  changeView(window.location.hash);
  window.addEventListener('hashchange', () => changeView(window.location.hash));
};
window.addEventListener('load', initialize);

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

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
/* Almacenamos el método firestore */

