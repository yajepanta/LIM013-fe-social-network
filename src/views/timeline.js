import { logOut } from '../model/firebase-auth.js';
import { createPost } from '../model/firebase-user.js';
import { storage } from '../main.js';

const timelineView = (user) => {
  const timelineTmplt = `
  <section id='timelineView'>
    <section id="profile" class="card">
      <img src='' id='photo-profile' class='rounded' alt="profile-picture">
      <ul class="profile-data">
        <li><i class="fas fa-id-card"></i><span class="name">${user.name}</span></li>
        <li><i class="fas fa-graduation-cap"></i><span class="grade">${user.grade}</span></li>
        <li><i class="fas fa-info-circle"></i><span class="campus">${user.campus}</span></li>
      </ul>
    </section>

    <section id="create-post">
      <div class='post card'>
        <div class="card-text">
          <label for="post-text"></label>
          <textarea class="post-input-text content-post" name="post-text" 
          placeholder="¿Qué quieres compartir, ${user.name}?"></textarea>
        </div>

        <div class='card-footer'>
          <label for='privacy-post'> Privacidad: </label>
          <select name='privacy' id='privacy-post'>
            <option value='public'> <i class="fas fa-globe-americas"> 🌎Público</i> </option>
            <option value='private'> <i class="fas fa-user-lock"></i> Privado</option>
          </select>  
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

  if (user.photo !== undefined) {
    photo.src = user.photo;
  } else {
    const divImgProfile = document.createElement('div');
    divImgProfile.classList.add('profile-undefined');
    const profileData = div.querySelector('.profile-data');
    divImgProfile.innerHTML = user.photo;
    photo.classList.add('hidden');
    const profile = document.getElementById('profile');
    profile.insertBefore(divImgProfile, profileData);
  }

  if (user.description !== undefined) {
    campus.innerHTML = user.description;
  }

  const fileInput = div.querySelector('#upload-img');

  let selectedFile = '';

  fileInput.addEventListener('change', () => {
    const preview = div.querySelector('.preview');
    preview.classList.remove('hidden');

    const reader = new FileReader();
    // el archivo a subir, la imagen entera con sus propiedades size, name, etc
    selectedFile = fileInput.files[0];

    // reader pasa por varios estados, seleccionamos el onload
    if (selectedFile) {
      // el reader recibe un evento que es todo el proceso de cargar la imagen. progress event
      reader.onload = () => {
        // reader result es la imagen en código Blob (base64 string)        imgURL = reader.result;
        preview.src = reader.result;
      };
      /* Starts reading the contents of the specified Blob, once finished,
      the result attribute contains a data: URL representing the file's data.
      Va al final del evento onload porque debe estar cargada la imagen para recien
      pasarla a URL */
      reader.readAsDataURL(selectedFile);
    }
  });
  const uploadFile = (userID, img) => {
    // subimos la referencia de la imagen al storage
    const uploadTask = storage.ref(`imgY/${userID}/${img.name}`).put(img);
    // nos devuelve una promesa a la que luego anidaremos otra promesa.
    // a la promesa le adjuntamos el método getDownloadURL, queda en pending
    // hasta que se resuelve dentro de la instancia con los datos de file.
    // y devuelve la url
    return uploadTask.then(snapshot => snapshot.ref.getDownloadURL());
  };

 /*  const uploadFile = (userID, img) => {
    storage.ref(`imgY/${userID}/${img.name}`).put(img).then((snapshot) => {
      // snapshot es la referencia de laimagen en objeto con propiedades bytes, etc
      return snapshot.ref.getDownloadURL().then(a => console.log(a));
    });
  }; */

  // Crear Post
  const btnSharePost = div.querySelector('#share-post');
  btnSharePost.addEventListener('click', () => {
    // como hacer que se le asigne el string vacio
    let contentPost = div.querySelector('.content-post').value;
    const idPost = `${Math.random()}`;
    const date = new Date().toLocaleString();

    if (contentPost !== '') {
      if (selectedFile === '') {
        createPost(user.id, user.name, idPost, date, contentPost, '', user.photo)
          .then(() => {
            console.log('post creado');
            contentPost = '';
          })
          .catch(err => console.error(err));
      } else {
        console.log('post con imagen');
        uploadFile(user.id, selectedFile)
          .then(imgpost => createPost(user.id, user.name, idPost, date, contentPost, imgpost, user.photo));
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
      <span id='post-author-name'>${doc.data().name}</span> 
      <button type="button" class='edit-post post-btn'><i class="fas fa-edit"></i> Editar</button>
      <button type='button' class='button-delete-post post-btn'><i class="fas fa-trash-alt"></i></button>    
     </div>
   
     <div class="card-text">
       <label for="post-text-posted"></label>
       <textarea class="posted-post" name="post-text-posted" readonly>${doc.data().post}</textarea>
       <img src='' class='${doc.data().img ? 'post-img' : 'post-img hidden'}' height="150" alt="Image preview...">
     </div>
   
     <div class="card-footer">
       <button type="button" id="like-post" class="post-btn"><i class="fas fa-thumbs-up"></i> Me gusta</button>
       <button class="post-btn comment-post"><i class="fas fa-comments"></i> Comentar</button>
     </div>
   </div>
   `;
      });

      const btnDeletePost = timeline.querySelectorAll('.button-delete-post');
      console.log(btnDeletePost);
      btnDeletePost.forEach(btn => btn.addEventListener('click', e => console.log(e.target)));
    });
  allPosts();
  // agregar otro recorrido para que obtenga los dtos en tiempo real de cada usuario
  // e introducir esa data dentro de all posts
  

  
  

  
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
