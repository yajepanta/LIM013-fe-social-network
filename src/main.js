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

/* // Get a non-default Storage bucket
export const storage = firebase.app().storage('imgY/');

// Create a storage reference from our storage service
export const storageRef = storage.ref(); */

/* const init = () => {
  changeView(window.location.hash);
  window.addEventListener('hashchange', () => changeView(window.location.hash));
};

window.addEventListener('load', init); */

const initialize = () => {
  validationUser(changeView);
};

window.addEventListener('load', initialize);
window.addEventListener('hashchange', initialize);

/* 
export default (profile) => {
  const user = firebase.auth().currentUser;
  const viewWall = `
  <aside class="user">
    <div id="userInfo">
    <img class="circulo-profile" src="">
    <a class='hide' id='edit-button-image' href='#/profile'><i class="far fa-edit"></i></a>
    <a href='#/profile' class='hide' id='save-button-image'><i class="far fa-save"></i></a>    
    <p id="user-name-profile"></p>
    <a class='hide' id='edit-button-name' href='#/profile'><i class="far fa-edit"></i></a>
    <a href='#/profile' class='hide' id='save-button-name'><i class="far fa-save"></i></a>
    <input class="hide" class="inputProfile" type="text" value=""> 
    <p id="user-name-description"></p>
    <a class='hide' id='edit-button-text' href='#/profile'><i class="far fa-edit"></i></a>
    <a href='#/profile' class='hide' id='save-button-text'><i class="far fa-save"></i></a> 
    <input class="inputProfile hide" type="text" value="">       
    </div>
  </aside>
  <section class="post">
      <section id="post-new">
          <select id="post-new-privacity">
          <option value="public">🌎 Público</option>
          <option value="privacity">🔒 Privado</option>
          </select>
          <textarea id="post-new-text" cols="" rows="3" placeholder="¿Qué pasos compartiras hoy?"></textarea>
          <div class="post-buttoms">
            <label class ="btn btn-file">
              <input class='allInputs' type="file" name="" id="get-file" hidden>
              <img class="circulo-img bgcolor" src="img/image.svg" alt="Insertar imagen">
            </label>
            <button class="bgcolor" id="post-btn-publish">PUBLICAR</button>
          </div>
      </section>
      <section id="post-published">
      </section>
  </section>
    `;
  const divElemt = document.createElement('div');
  divElemt.classList.add('view-wall');
  divElemt.innerHTML = viewWall;

  // Pinta todos los posts y segun el state de la privacidad, los hace visible o no //
  const postSection = divElemt.querySelector('#post-published');
  // revisar y simplificar la función.
  // DOM para agregar Info del usuario //
  const nameProfile = divElemt.querySelector('#user-name-profile');
  const descriptionProfile = divElemt.querySelector('#user-name-description');
  const photoProfile = divElemt.querySelector('.circulo-profile');
  const buttonEditText = divElemt.querySelector('#edit-button-text');
  const buttonSaveText = divElemt.querySelector('#save-button-text');
  getUser(user.uid)
    .then((docUser) => {
      // console.log(docUser.data().displayName);
      nameProfile.innerHTML = docUser.data().displayName;
      photoProfile.src = docUser.data().photoURL;
      descriptionProfile.innerHTML = docUser.data().infoUser;
    });
  if (profile) {
    buttonEditText.classList.remove('hide');
    buttonEditText.addEventListener('click', () => {
      // buttonSaveName.classList.remove('hide');
      buttonSaveText.classList.remove('hide');
      nameProfile.contentEditable = true;
      descriptionProfile.contentEditable = true;
    });
    buttonSaveText.addEventListener('click', () => {
      const newDescriptionProfile = descriptionProfile.textContent;
      const newNameProfile = nameProfile.textContent;
      updateInfoUser(user.uid, newNameProfile, newDescriptionProfile);
      buttonSaveText.classList.add('hide');
      nameProfile.contentEditable = false;
      descriptionProfile.contentEditable = false;
    });
  }
  getPosts((objArray) => {
    postSection.innerHTML = '';
    objArray.forEach((element) => {
      if (profile === true) {
        if (element.userId === user.uid) {
          getUser(element.userId)
            .then((doc) => {
              postSection.appendChild(allPost(element, doc.data()));
            });
        }
      } else if (element.state !== 'privacity' || element.userId === user.uid) {
        getUser(element.userId)
          .then((doc) => {
            postSection.appendChild(allPost(element, doc.data()));
          });
      }
    });
  });

  // En esta seccion se crea post con o sin imagen
  const btnCreatePost = divElemt.querySelector('#post-btn-publish');
  if (user) {
    btnCreatePost.addEventListener('click', (event) => {
      event.preventDefault();
      const file = divElemt.querySelector('#get-file');
      const date = new Date().toLocaleString();
      const imgPost = file.files[0];
      const privacy = divElemt.querySelector('#post-new-privacity').value;
      const contentText = divElemt.querySelector('#post-new-text').value;
      divElemt.querySelector('#post-new-text').value = '';
      if (imgPost === undefined) {
        createPost(user.uid, contentText, privacy, '');
      } else {
        uploadImage(date, imgPost)
          .then(url => console.log(url) || createPost(user.uid, contentText, privacy, url));
        file.value = '';
      }
    });
  }
  // DOM para el cerrar sesion //
  const btnLogOut = document.querySelector('#btn-logout');
  btnLogOut.addEventListener('click', () => {
    logOut()
      .then(() => {
        window.location.hash = '#/';
        document.querySelector('#header').classList.remove('show');
        document.querySelector('#header').classList.add('hide');
      });
  });
  return divElemt;
}; */