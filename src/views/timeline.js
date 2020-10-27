import { logOut } from '../model/firebase-auth.js';
import { createPost, deletePost, editTextPost } from '../model/firebase-user.js';
import { storage } from '../main.js';

// Pseudocódigo para la privacidad:
/* si el current user es diferente al id del post, y
privacy del post === private, se debe ocultar
 */
// debe recibir la data de todos los posts individualmente, o sea con el snapshot
// y retornar cada fragmento anidado al section timelineview
const postsView = (posts) => {
  const currentUser = firebase.auth().currentUser;
  const post = posts.data();
  const postsTmplt = `
      <div class="card-header">
        <img src="${post.photo}" class='post-profile-picture rounded' alt="profile-picture">
        <span id='post-author-name'>${post.name}</span> 
        <button type="button" class='${currentUser.uid === post.user ? 'edit-post post-btn' : 'hidden'}'><i class="fas fa-edit"></i> Editar</button>
        <button type='button' class='${currentUser.uid === post.user ? 'delete-post post-btn' : 'hidden'}'><i class="fas fa-trash-alt"></i></button>    
      </div>
  
      <div class="card-text">
        <label for="post-text-posted"></label>
        <textarea class="content-post" name="post-text-posted" readonly>${post.content}</textarea>
        <img src='${post.img}' class='${post.img ? 'post-img' : 'post-img hidden'}' height="150" alt="Post Image">
      </div>
  
      <div class="card-footer">
        <button type="button" id="like-post" class="post-btn"> <i class="fas fa-thumbs-up">1</i> Me gusta</button>
        <button class="post-btn comment-post"><i class="fas fa-comments">3</i> Comentar</button>
      </div>
  `;
  // Obtengo un div de class post card por cada post
  const timelineFragment = document.createDocumentFragment();
  const div = document.createElement('div');
  div.setAttribute('class', 'post card');
  div.innerHTML = postsTmplt;
  timelineFragment.appendChild(div);

  if (currentUser.uid !== post.user && post.privacy === 'private') {
    div.classList.add('hidden');
  }

  const btnDeletePost = div.querySelector('.delete-post');
  if (btnDeletePost) {
    btnDeletePost.addEventListener('click', () => {
      deletePost(posts.id)
        .then(() => { div.setAttribute('class', 'hidden'); })
        .catch(err => console.error(err));
    });
  }


  // Edita in-place
  const btnEditPost = div.querySelector('.edit-post');
  // por que no lee mi boton si no tiene condicional, como hago que cargue desps del dom
  if (btnEditPost) {
    btnEditPost.addEventListener('click', () => {
      const contentPost = div.querySelector('.content-post');
      contentPost.removeAttribute('readonly');
      contentPost.classList.add('focus');
      const cardFooter = div.querySelector('.card-footer');
      cardFooter.innerHTML = `
      <label for='privacy-post'> </label>
            <select name='privacy' id='privacy-post'>
              <option value='public'> <i class="fas fa-globe-americas"> Público</i> </option>
              <option value='private'> <i class="fas fa-user-lock"></i> Privado</option>
            </select>  
            
            <button id="share-post" class="post-btn"><i class="fas fa-share-square"></i> Compartir</button>`;
      // Comparte post editado
      const privacy = div.querySelector('#privacy-post');
      const btnSharePost = div.querySelector('#share-post');
      btnSharePost.addEventListener('click', () => {
        console.log(privacy.value);
        if (contentPost.value !== '') {
          editTextPost(posts.id, contentPost.value, privacy.value)
            .then(() => {
              contentPost.setAttribute('readonly', 'readonly');
              contentPost.classList.remove('focus');
              cardFooter.innerHTML = `
              <button type="button" id="like-post" class="post-btn"> <i class="fas fa-thumbs-up">1</i> Me gusta</button>
              <button class="post-btn comment-post"><i class="fas fa-comments">3</i> Comentar</button>`;
            })
            .catch(err => console.error(err));
        } else {
          console.error('post vacío');
        }
      });
    });
  }

  return timelineFragment;
};

const timelineView = (user) => {
  const timelineTmplt = `
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
          <label for='privacy-post'> </label>
          <select name='privacy' id='privacy-post'>
            <option value='public'> <i class="fas fa-globe-americas"> Público</i> </option>
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

    <!-- SECCIÓN CON LOS DEMÁS POSTS timelineView appendChild-->
    <section id='timeline'>
    </section>
`;

  /* const div = document.createElement('div');
  div.innerHTML = timelineTmplt; */
  const fragment = document.createDocumentFragment();
  const section = document.createElement('section');
  section.setAttribute('id', 'timelineView');
  section.innerHTML = timelineTmplt;
  fragment.appendChild(section);

  const photo = section.querySelector('#photo-profile');
  const campus = section.querySelector('.campus');

  if (user.photo !== undefined) {
    photo.src = user.photo;
  } else {
    const divImgProfile = document.createElement('div');
    divImgProfile.classList.add('profile-undefined');
    const profileData = section.querySelector('.profile-data');
    divImgProfile.innerHTML = user.photo;
    photo.classList.add('hidden');
    const profile = document.getElementById('profile');
    profile.insertBefore(divImgProfile, profileData);
  }

  if (user.description !== undefined) {
    campus.innerHTML = user.description;
  }

  const fileInput = section.querySelector('#upload-img');

  let selectedFile = '';

  fileInput.addEventListener('change', () => {
    const preview = section.querySelector('.preview');
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

  const timeline = section.querySelector('#timeline');
  // Timeline: Llamamos a los posts. Revisar el condicional .where('user', '==', currentUser.uid)
  const allPosts = () => {
    timeline.innerHTML = '';

    firebase.firestore().collection('postsY')
      .orderBy('date', 'desc')
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          timeline.appendChild(postsView(doc));
        });
      });
  };

  // Llamamos a los posts
  allPosts();

  // Crear Post
  const btnSharePost = section.querySelector('#share-post');
  btnSharePost.addEventListener('click', () => {
    let contentPost = section.querySelector('.content-post');
    const date = new Date().toLocaleString();
    const privacy = section.querySelector('#privacy-post').value;

    if (contentPost !== '') {
      if (selectedFile === '') {
        createPost(user.id, user.name, date, contentPost.value, '', user.photo, privacy)
          .then(() => {
            console.log('post creado');
            contentPost.value = '';
            allPosts();
          })
          .catch(err => console.error(err));
      } else {
        console.log('post con imagen');
        uploadFile(user.id, selectedFile)
          .then(imgpost => createPost(user.id, user.name, date, contentPost.value, imgpost, user.photo, privacy))
          .then(() => {
            console.log('post con imagen creado');
            contentPost = '';
            allPosts();
          });
      }
    } else {
      console.error('post vacío');
    }
  });


  // agregar otro recorrido para que obtenga los dtos en tiempo real de cada usuario
  // e introducir esa data dentro de all posts


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

  return fragment;
};

export { timelineView };
