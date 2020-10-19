import { logOut } from '../model/firebase-auth.js';

import { createPost } from '../model/firebase-user.js';
import { storageRef } from '../main.js';

const timelineView = (data) => {
  const timelineTmplt = `
  <section id='timelineView'>
    <section id="profile" class="card">
      <img src='' id='photo-profile' class='rounded' alt="profile-picture">
      <ul class="profile-data">
        <li><i class="fas fa-id-card"></i><span class="name">${data.name}</span></li>
        <li><i class="fas fa-graduation-cap"></i><span class="grade">${data.grade}</span></li>
        <li><i class="fas fa-info-circle"></i><span class="campus">${data.campus}</span></li>
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
          <textarea class="post-input-text content-post" name="post-text" placeholder="¿Qué quieres compartir, ${data.name}?"></textarea>
        </div>

        <div class='card-footer'>
          <label for='upload-img' class="post-btn"><i class="fas fa-images"></i> Subir imagen
            <input type='file' id='upload-img' class='post-btn' accept='image/png, image/jpeg'>
          </label>
          <button id="share-post" class="post-btn"><i class="fas fa-share-square"></i> Compartir</button>
        </div>
        <img src='' class='preview hidden' height="150" alt="Image preview...">
      </div>  
    </section>

    <!-- SECCIÓN CON LOS DEMÁS POSTS -->
    <section id="timeline">  
    </section>
  </section>
`;

  const div = document.createElement('div');
  div.innerHTML = timelineTmplt;

  const photo = div.querySelector('#photo-profile');
  const campus = div.querySelector('.campus');
  const timeline = div.querySelector('#timeline');

  if (data.photo !== undefined) {
    photo.src = data.photo;
  } else {
    const divImgProfile = document.createElement('div');
    divImgProfile.classList.add('profile-undefined');
    const profileData = div.querySelector('.profile-data');
    divImgProfile.innerHTML = data.photo;
    photo.classList.add('hidden');
    const profile = document.getElementById('profile');
    profile.insertBefore(divImgProfile, profileData);
  }

  if (data.description !== undefined) {
    campus.innerHTML = data.description;
  }

  const fileInput = div.querySelector('#upload-img');

  let selectedFile = '';
  fileInput.addEventListener('change', () => {
    const preview = div.querySelector('.preview');
    preview.classList.remove('hidden');

    const reader = new FileReader();
    // el archivo a subir, la imagen entera
    selectedFile = fileInput.files[0];
    // reader result es la imagen en código Blob
    if (selectedFile) {
      reader.onload = () => {
        // reader result es la imagen en código Blob(base64 string)        imgURL = reader.result;
        preview.src = reader.result;
      };
      /* Starts reading the contents of the specified Blob, once finished,
      the result attribute contains a data: URL representing the file's data. */
      reader.readAsDataURL(selectedFile);
    }
  });

  // Crear Post
  const btnSharePost = div.querySelector('#share-post');
  btnSharePost.addEventListener('click', () => {
    let contentPost = div.querySelector('.content-post').value;
    const idPost = `${Math.random()}`;
    const date = new Date().toLocaleString();

    if (contentPost !== '') {
      if (selectedFile === '') {
        createPost(data.id, data.name, idPost, date, contentPost, 'imgpost', data.photo)
          .then(() => {
            console.log('post creado');
            contentPost = '';
          })
          .catch(err => console.error(err));
      } else {
        createPost(data.id, data.name, idPost, date, contentPost, selectedFile, data.photo)
          .then(() => {
            console.log('post creado con imagen');
            contentPost = '';
          })
          .catch(err => console.error(err));
      }
    } else {
      console.error('post vacío');
    }
  });


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
       <span id='post-author-name'>${doc.data().name} ${doc.data().img}</span> 
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
