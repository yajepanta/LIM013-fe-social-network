import { logOut } from '../model/firebase-auth.js';

import { dataUser } from '../model/firebase-user.js';

export const timelineView = () => {
  /* const user = firebase.auth().currentUser; */
  const timeline = `
    <!-- PERFIL CON OPCIÓN PARA POSTEAR -->
  <section id="timelineView">
    <section id="profile" class="card">
      <img src="img/perfil.png" id='photo-profile' class='rounded' alt="profile-picture">
      <ul class="profile-data">
        <li class="name"><i class="fas fa-id-card"></i> Profesora</li>
        <li class="grade"><i class="fas fa-graduation-cap"></i> 1ro de secundaria</li>
        <li class="description"><i class="fas fa-info-circle"></i> Compartiendo conocimiento</li>
      </ul>
    </section>

    <section class="post card">
      <div class="post-options">
        <div id="privacy-post" class="dropdown button-post">
          <button class="dropbtn">Privacidad</button>
          <div class="dropdown-content">
            <a href="#"><i class="fas fa-globe-americas"></i></a>
            <a href="#"><i class="fas fa-user-lock"></i></a>
          </div>
        </div>
        <a href="#"><i class="fas fa-globe-americas"></i></a>
        <button type="button" id="edit-post" class="button-post"><i class="fas fa-edit"></i> Editar</button>      
      </div>

      <div class="text-container">
        <label for="post-text"></label>
        <textarea id="post-text" class="post-input-text" name="post-text" placeholder="¿Qué quieres compartir?">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</textarea>
      </div>

      <div class="post-buttons">
        <button type="button" id="load-img" class="button-post"><i class="fas fa-images"></i> Subir imagen</button>
        <button id="share-post" class="button-post"><i class="fas fa-share-square"></i> Compartir</button>
      </div>
    </section>

    <!-- SECCIÓN CON LOS DEMÁS POSTS -->
    <section id="timeline" class="posted card">
      <!-- ocultar íconos de borrar y editar -->
      <div class="post-author">
        <img src="img/perfil.png" class='post-profile-picture rounded' alt="profile-picture"><span id='post-author-name'>PROFESOR ABCDEF</span>      
      </div>

      <div class="text-container">
        <label for="post-text-posted"></label>
        <textarea class="post-input-text" name="post-text-posted" readonly>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</textarea>
      </div>

      <div class="post-buttons">
        <button type="button" id="like-post" class="button-post"><i class="fas fa-thumbs-up"></i> Me gusta</button>
        <button id="share-post" class="button-post"><i class="fas fa-comments"></i> Comentar</button>
      </div>
    </section>
  </section> `;
  const div = document.createElement('div');
  div.innerHTML = timeline;
  /* const userName = div.querySelector('.name');
  const userGrade = div.querySelector('.grade');
  const userDescription = div.querySelector('.description');
  const userPhoto = div.querySelector('#photo-profile');
  // Llenado con los datos del usuario
  dataUser(user.uid)
    .then((docUser) => {
      userName.innerHTML = docUser.data().name;
      userGrade.innerHTML = docUser.data().grade;
      userDescription.innerHTML = docUser.data().description;
      userPhoto.src = docUser.data().photo;
    });
  // DOM para el cerrar sesion
  const btnLogOut = document.querySelector('#btn-logout');
  btnLogOut.addEventListener('click', () => {
    logOut()
      .then(() => {
        console.log('salio de logeo');
        window.location.hash = '#/Cerrar';
        document.querySelector('#nav').classList.remove('mostrar');
      });
  }); */
  return div;
};
