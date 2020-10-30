import { logOut } from '../model/firebase-auth.js';
import { createPost, deletePost, editTextPost } from '../model/firebase-user.js';

/*  Template and post's functions */

const postsView = (posts) => {
  const currentUser = firebase.auth().currentUser;
  const post = posts.data();
  const postsTmplt = `
      <div class="card-header">
        <img src='${post.photo === 'noPhoto' ? './img/avatar.png' : post.photo}' class='post-profile-picture rounded' alt="profile-picture">
        <span id='post-author-name'>${post.name}</span> 
        <button type="button" class='${currentUser.uid === post.user ? 'edit-post post-btn' : 'hidden'}'><i class="fas fa-edit"></i> Editar</button>
        <button type='button' class='${currentUser.uid === post.user ? 'delete-post post-btn' : 'hidden'}'><i class="fas fa-trash-alt"></i></button>    
      </div>
  
      <div class="card-text">
        <label for="post-text-posted"></label>
        <textarea class="content-post" name="post-text-posted" readonly>${post.content}</textarea>
        <img src='${post.img}' class='${post.img ? 'post-img' : 'post-img hidden'}' width='150' height="150" alt="Post Image">
      </div>
      
      <div class="card-footer">
      <!-- <button type="button" id="like-post" class="post-btn"> <i class="fas fa-thumbs-up">1</i> Me gusta</button> -->
        <button class="post-btn comment-post"><i class="fas fa-comments"></i> Comentar</button>
      </div>
      <div class='card-footer card-footer-edit hidden'>
          <label for='privacy-post'> </label>
          <select class="fa select-privacy" name='privacy' id='privacy-post'>
            <option class="fa select-privacy" value='public'>  &#xf57d; </option>
            <option class="fa select-privacy" value='private'> &#xf023; </option>
          </select>

          <label for='upload-img' class="post-btn"><i class="fas fa-images"></i> Agregar imagen
            <input type='file' id='upload-img' class='post-btn' accept='image/png, image/jpeg'>
          </label>
          
          <button class="post-btn share-post"><i class="fas fa-share-square"></i> Compartir</button>
      </div>
      <button class='cancel-img hidden'><i class="far fa-times-circle"></i></button>
      <img src='' class='preview hidden' height="150" alt="Image preview...">

  `;

  const timelineFragment = document.createDocumentFragment();
  const div = document.createElement('div');
  div.setAttribute('class', 'post card');
  div.innerHTML = postsTmplt;
  timelineFragment.appendChild(div);

  if (currentUser.uid !== post.user && post.privacy === 'private') {
    div.classList.add('hidden');
  }

  /* Delete post */
  const btnDeletePost = div.querySelector('.delete-post');
  btnDeletePost.addEventListener('click', () => {
    deletePost(posts.id)
      .then(() => { div.classList.add('hidden'); })
      .catch(err => console.error(err));
  });


  /* Edit post in-place */
  const btnEditPost = div.querySelector('.edit-post');

  btnEditPost.addEventListener('click', () => {
    const contentPost = div.querySelector('.content-post');
    contentPost.removeAttribute('readonly');
    contentPost.classList.add('focus');

    const cardFooter = div.querySelector('.card-footer');
    cardFooter.classList.add('hidden');

    const cardFooterEditOptions = div.querySelector('.card-footer-edit');
    cardFooterEditOptions.classList.remove('hidden');

    /* Share edited post */
    const privacy = div.querySelector('#privacy-post');
    const btnSharePost = div.querySelector('.share-post');
    btnSharePost.addEventListener('click', () => {
      if (contentPost.value !== '') {
        editTextPost(posts.id, contentPost.value, privacy.value)
          .then(() => {
            contentPost.setAttribute('readonly', 'readonly');
            contentPost.classList.remove('focus');
            cardFooter.classList.remove('hidden');
            cardFooterEditOptions.classList.add('hidden');
          })
          .catch(err => console.error(err));
      } else {
        editTextPost(posts.id, contentPost.value, privacy.value)
          .then(() => {
            contentPost.classList.add('hidden');
          })
          .catch(err => console.error(err));
      }
    });
  });

  return timelineFragment;
};

/* Render posts */
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
          <select class="fa select-privacy" name='privacy' id='privacy-post'>
            <option class="fa select-privacy" value='public'>  &#xf57d; </option>
            <option class="fa select-privacy" value='private'> &#xf023; </option>
          </select>

          <label for='upload-img' class="post-btn"><i class="fas fa-images"></i> Agregar imagen
            <input type='file' id='upload-img' class='post-btn' accept='image/png, image/jpeg'>
          </label>
          
          <button class="post-btn share-post"><i class="fas fa-share-square"></i> Compartir</button>
        </div>
        <div class='preview-card'>
          <button class='cancel-img hidden'><i class="far fa-times-circle"></i></button>
          <img src='' class='preview hidden' height="150" alt="Image preview...">
        </div>
      </div>  
    </section>

    <!-- SECCIÓN CON LOS DEMÁS POSTS timelineView appendChild-->
    <section id='timeline'>
    </section>
`;

  const fragment = document.createDocumentFragment();
  const section = document.createElement('section');
  section.setAttribute('id', 'timelineView');
  section.innerHTML = timelineTmplt;
  fragment.appendChild(section);

  const photo = section.querySelector('#photo-profile');
  const campus = section.querySelector('.campus');

  /* User's profile data */

  if (user.photo === 'noPhoto') {
    const firstLetter = user.name.slice(0, 1);
    const divImgProfile = document.createElement('div');
    divImgProfile.classList.add('profile-undefined');
    const profileData = section.querySelector('.profile-data');
    divImgProfile.innerHTML = firstLetter;
    photo.classList.add('hidden');
    const profile = section.querySelector('#profile');
    profile.insertBefore(divImgProfile, profileData);
  } else {
    photo.src = user.photo;
  }

  if (user.description !== undefined) {
    campus.innerHTML = user.description;
  }

  /* Post's Functions */

  // Upload image
  const fileInput = section.querySelector('#upload-img');
  const previewCard = section.querySelector('.preview-card');
  const preview = section.querySelector('.preview');
  let selectedFile = '';
  fileInput.addEventListener('change', () => {
    const btnCancel = section.querySelector('.cancel-img');
    preview.classList.remove('hidden');

    const reader = new FileReader();
    // el archivo a subir, la imagen entera con sus propiedades size, name, etc
    selectedFile = fileInput.files[0];

    // reader pasa por varios estados, seleccionamos el onload
    btnCancel.classList.remove('hidden');
    btnCancel.addEventListener('click', () => {
      selectedFile = '';
      preview.classList.add('hidden');
      btnCancel.classList.add('hidden');
    });
    // el reader recibe un evento que es todo el proceso de cargar la imagen. progress event
    reader.onload = () => {
      // reader result es la imagen en código Blob (base64 string)
      preview.src = reader.result;
    };
    /* Starts reading the contents of the specified Blob, once finished,
      the result attribute contains a data: URL representing the file's data.
      Va al final del evento onload porque debe estar cargada la imagen para recién
      pasarla a URL */
    btnCancel.classList.remove('hidden');
    reader.readAsDataURL(selectedFile);
  });

  const uploadFile = (userID, img) => {
    const storage = firebase.storage();
    // subimos la referencia de la imagen al storage
    const uploadTask = storage.ref(`imgY/${userID}/${img.name}`).put(img);
    // nos devuelve una promesa a la que luego anidaremos otra promesa.
    // a la promesa le adjuntamos el método getDownloadURL, queda en pending
    // hasta que se resuelve dentro de la instancia con los datos de file.
    // y devuelve la url
    return uploadTask.then(snapshot => snapshot.ref.getDownloadURL());
  };

  // Render each posts .where('user', '==', currentUser.uid)
  const allPosts = () => {
    const timeline = section.querySelector('#timeline');
    firebase.firestore().collection('postsY')
      .orderBy('date', 'desc')
      .onSnapshot((querySnapshot) => {
        timeline.innerHTML = '';
        querySnapshot.forEach((doc) => {
          timeline.appendChild(postsView(doc));
        });
      });
  };

  window.addEventListener('onload', allPosts());

  // Create Post
  const btnSharePost = section.querySelector('.share-post');
  btnSharePost.addEventListener('click', () => {
    const contentPost = section.querySelector('.content-post');
    const date = new Date();
    const privacy = section.querySelector('#privacy-post').value;
    // switch

    if (contentPost.value !== '') {
      if (selectedFile === '') {
        createPost(user.id, user.name, date, contentPost.value, '', user.photo, privacy)
          .then(() => {
            contentPost.value = '';
            allPosts();
          })
          .catch(err => console.error(err));
      } else {
        uploadFile(user.id, selectedFile)
          .then(imgpost => createPost(user.id, user.name, date, contentPost.value, imgpost, user.photo, privacy))
          .then(() => {
            contentPost.value = '';
            allPosts();
          });
      }
    }
    if (contentPost.value === '') {
      if (selectedFile !== '') {
        uploadFile(user.id, selectedFile)
          .then(imgpost => createPost(user.id, user.name, date, contentPost.value, imgpost, user.photo, privacy))
          .then(() => {
            contentPost.value = '';
            allPosts();
          });
      }
    }
  });

  // Log out
  const btnLogOut = document.getElementById('btn-logout');
  btnLogOut.addEventListener('click', () => {
    logOut()
      .then(() => {
        window.location.hash = '#/Cerrar';
        document.querySelector('#nav').classList.remove('show');
      })
      .catch(err => console.error(err));
  });
  return fragment;
};

export { timelineView };
