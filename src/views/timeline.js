import { logOut } from '../model/firebase-auth.js';

import { dataUser, createPost } from '../model/firebase-user.js';

const timelineView = () => {
  // Usuario loggeado
  const currentUser = firebase.auth().currentUser;
  console.log(currentUser);
  const timelineTmplt = `
  <section id='timelineView'>
    <section id="profile" class="card">
      <img src='' id='photo-profile' class='rounded' alt="profile-picture">
      <ul class="profile-data">
        <li><i class="fas fa-id-card"></i><span class="name"> Profesora</span></li>
        <li><i class="fas fa-graduation-cap"></i><span class="grade"> 1ro de secundaria</span></li>
        <li><i class="fas fa-info-circle"></i><span class="description"> Compartiendo conocimiento</span></li>
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
        </div>

        <div class="card-text">
          <label for="post-text"></label>
          <textarea class="post-input-text content-post" name="post-text" placeholder="¿Qué quieres compartir?"></textarea>
        </div>

        <div class='card-footer'>
          <label for='upload-img' class="post-btn"><i class="fas fa-images"></i> Subir imagen
            <input type='file' id='upload-img' class='post-btn' accept='image/png, image/jpeg'>
          </label>
          <button id="share-post" class="post-btn"><i class="fas fa-share-square"></i> Compartir</button>
        </div>
        <img src='' class='preview' height="150" alt="Image preview...">
      </div>  
    </section>

    <!-- SECCIÓN CON LOS DEMÁS POSTS -->
    <section id="timeline">  
    </section>
  </section>
`;


  const div = document.createElement('div');
  div.innerHTML = timelineTmplt;

  const name = div.querySelector('.name');
  const grade = div.querySelector('.grade');
  const description = div.querySelector('.description');
  const photo = div.querySelector('#photo-profile');
  const timeline = div.querySelector('#timeline');

  let selectedFile = '';
  let imgURL = '';

  dataUser(currentUser.uid)
  // Llenado con los datos del usuario
    .then((docUser) => {
      name.innerHTML = docUser.data().name;
      grade.innerHTML = docUser.data().grade;
      if (docUser.data().photo === undefined) {
        photo.src = docUser.data().photo;
      } else {
        const nameUser = docUser.data().name;
        const firstLetter = nameUser.slice(0, 1);
        const divImgProfile = document.createElement('div');
        divImgProfile.classList.add('profile-undefined');
        const profileData = div.querySelector('.profile-data');
        divImgProfile.innerHTML = firstLetter;
        photo.classList.add('hidden');
        const profile = document.getElementById('profile');
        profile.insertBefore(divImgProfile, profileData);
      }

      if (docUser.data().description !== undefined) {
        description.innerHTML = docUser.data().description;
      }


      // Crear Post
      if (currentUser) {
        const fileInput = document.querySelector('#upload-img');
        const preview = document.querySelector('.preview');
        const reader = new FileReader();

        fileInput.addEventListener('change', () => {
          selectedFile = fileInput.files[0];
          if (selectedFile) {
            reader.readAsDataURL(selectedFile);
            reader.onload = () => {
              imgURL = reader.result;
              preview.src = reader.result;
            };
          }
        });

        const btnSharePost = div.querySelector('#share-post');
        btnSharePost.addEventListener('click', () => {
          let contentPost = div.querySelector('.content-post').value;
          const idPost = `${Math.random()}`;
          const date = new Date().toLocaleString();

          if (contentPost !== '') {
            createPost(currentUser.uid, docUser.data().name, idPost, date, contentPost, 'imgpost', docUser.data().photo)
              .then(() => {
                console.log('post creado');
                contentPost = '';
              })
              .catch(err => console.error(err));
          } else {
            console.error('post vacío');
          }
        });
      }
    })
    .catch(err => console.error(err));


  // Timeline: Llamamos a los posts. Revisar el condicional .where('user', '==', currentUser.uid)

  const allPosts = () => firebase.firestore().collection('postsY')
    .orderBy('date', 'desc')
    .onSnapshot((querySnapshot) => {
      timeline.innerHTML = '';
      querySnapshot.forEach((doc) => {
        timeline.innerHTML += `
   <div class="post card">
     <div class="card-header">
       <img src="${doc.data().photo}" class='post-profile-picture rounded' alt="profile-picture">
       <span id='post-author-name'>${doc.data().name}</span> 
       <button type="button" id="edit-post" class="post-btn"><i class="fas fa-edit"></i> Editar</button>
      <button type='button' class='button-delete-post post-btn'><i class="fas fa-trash-alt"></i></button>
          
     </div>
   
     <div class="card-text">
       <label for="post-text-posted"></label>
       <textarea class="posted-post" name="post-text-posted" readonly>${doc.data().post}</textarea>
     </div>
   
     <div class="card-footer">
       <button type="button" id="like-post" class="post-btn"><i class="fas fa-thumbs-up"></i> Me gusta</button>
       <button class="post-btn comment-post"><i class="fas fa-comments"></i> Comentar</button>
     </div>
   </div>
   `;
      });
      console.log('Posts with author', currentUser.uid);
    });

  allPosts();

  // Timeline: Llamamos a los posts
  /* PSEUDOCÓDIGO
. acceder a la coleccion de los posts con get. doc data <Listo>
. pintar cada dato de la coleccion que quiero, en el template */


  /* const timeline = document.getElementById('timeline');
  const getPosts = idPost => firebase.firestore().collection('postsY').doc(idPost).get();
  const onGetPost = (callback) => firebase.firestore().collection('postsY').onSnapshot(callback);

  window.addEventListener('load', () => {
    onGetPost((querySnapshot) => {
      timeline.innerHTML = '';

      querySnapshot.forEach((doc) => {
        const post = doc.data();
        console.log(post);
        timeline.innerHTML += `<div class="post card">
  <div class="card-header">
    <img src="img/perfil.jpg" class='post-profile-picture rounded' alt="profile-picture">
    <span id='post-author-name'>PROFESORA ABCDEF</span> 

  </div>

  <div class="card-text">
    <label for="post-text-posted"></label>
    <textarea class="posted-post" name="post-text-posted" readonly></textarea>
  </div>

  <div class="card-footer">
    <button type="button" id="like-post" class="post-btn"><i class="fas fa-thumbs-up"></i> Me gusta</button>
    <button class="post-btn comment-post"><i class="fas fa-comments"></i> Comentar</button>
  </div>
</div>
`;
      });
    });
  });
 */

  // Cerrar sesión
  const btnLogOut = document.getElementById('btn-logout');
  btnLogOut.addEventListener('click', () => {
    logOut()
      .then(() => {
        window.location.hash = '#/Cerrar';
        document.querySelector('#nav').classList.remove('mostrar');
      })
      .catch(err => console.error(err));
  });

  return div;
};

export { timelineView };
