import { logOut } from '../model/firebase-auth.js';

import { dataUser } from '../model/firebase-user.js';

export const timelineView = () => {
  const user = firebase.auth().currentUser;
  const timeline = `
    <!-- PERFIL CON OPCIÓN PARA POSTEAR -->
  <section id="timelineView">
    <section id="profile" class="card">
      <img src="img/perfil.jpg" id='photo-profile' class='rounded' alt="profile-picture">
      <ul class="profile-data">
        <li class="name"></li>
        <li class="level"></li>
        <li class="grade"></li>
        <li class="campus"></li>
      </ul>
    </section>

    <section id="create-post">
      <div class='post card'>
        <div class="card-header white">
          <div id="privacy-post" class="dropdown post-btn">
            <button class="dropbtn"><i class="fas fa-globe-americas"></i> Público <i class="fas fa-caret-down"></i></button>
            <div class="dropdown-content">
              <a href="#"><i class="fas fa-globe-americas"></i> Público</a>
              <a href="#"><i class="fas fa-user-lock"></i> Privado</a>
            </div>
          </div>
          <button type="button" id="edit-post" class="post-btn"><i class="fas fa-edit"></i> Editar</button>
          <button type='button' class='button-delete-post post-btn'><i class="fas fa-trash-alt"></i></button>      
        </div>

        <div class="card-text">
          <label for="post-text"></label>
          <textarea id="post-text" class="post-input-text" name="post-text" placeholder="¿Qué quieres compartir?">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</textarea>
        </div>

        <div class="card-footer">
          <button type="button" id="load-img" class="post-btn"><i class="fas fa-images"></i> Subir imagen</button>
          <button id="share-post" class="post-btn"><i class="fas fa-share-square"></i> Compartir</button>
        </div>
      </div>  
    </section>

    <!-- SECCIÓN CON LOS DEMÁS POSTS -->
    <section id="timeline">
        <!-- ocultar íconos de borrar y editar -->
      <div class="post card">
        <div class="card-header">
          <img src="img/perfil.jpg" class='post-profile-picture rounded' alt="profile-picture">
          <span id='post-author-name'>PROFESORA ABCDEF</span> 
             
        </div>

        <div class="card-text">
          <label for="post-text-posted"></label>
          <textarea class="post-input-text" name="post-text-posted" readonly>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</textarea>
        </div>

        <div class="card-footer">
          <button type="button" id="like-post" class="post-btn"><i class="fas fa-thumbs-up"></i> Me gusta</button>
          <button id="share-post" class="post-btn"><i class="fas fa-comments"></i> Comentar</button>
        </div>
      </div>  

      <div class="post card">
        <div class="card-header">
          <img src="img/perfil.jpg" class='post-profile-picture rounded' alt="profile-picture">
          <span id='post-author-name'>PROFESORA ABCDEF</span> 
             
        </div>

        <div class="card-text">
          <label for="post-text-posted"></label>
          <textarea class="post-input-text" name="post-text-posted" readonly>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</textarea>
        </div>

        <div class="card-footer">
          <button type="button" id="like-post" class="post-btn"><i class="fas fa-thumbs-up"></i> Me gusta</button>
          <button id="share-post" class="post-btn"><i class="fas fa-comments"></i> Comentar</button>
        </div>
      <div>  
    </section>
  </section> `;
  const div = document.createElement('div');
  div.innerHTML = timeline;
  const userName = div.querySelector('.name');
  const userGrade = div.querySelector('.grade');
  const userLevel = div.querySelector('.level');
  const userPhoto = div.querySelector('#photo-profile');
  const userCampus = div.querySelector('.campus');
  // Llenado con los datos del usuario
  dataUser(user.uid)
    .then((docUser) => {
      userName.innerHTML = docUser.data().name;
      userGrade.innerHTML = docUser.data().grade;
      userLevel.innerHTML = docUser.data().level;
      userCampus.innerHTML = docUser.data().campus;
      userPhoto.src = docUser.data().photo;
    });

  // Cerrar sesión
  const btnLogOut = document.getElementById('btn-logout');
  btnLogOut.addEventListener('click', () => {
    logOut()
      .then(() => {
        console.log('salio de logeo');
        window.location.hash = '#/Cerrar';
        document.querySelector('#nav').classList.remove('mostrar');
      });
  }); 
  return div;
};
