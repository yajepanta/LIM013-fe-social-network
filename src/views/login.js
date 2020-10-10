import { logInUser, logInFb, logInGm } from '../model/firebase-auth.js';

import { createUser } from '../model/firebase-user.js';

export const logInView = () => {
  const logInTmplt = `  
      <div class="saludo">
        <h1>¡Bienvenido a InnovaSocial!</h1>
        <p>En este lugar podrás comunicarte y compartir recursos</p>
      </div>
      <div id="formulario-principal">
        <form id="form-login">
          <i class="fas fa-envelope-square"></i>
          <input type="text" id="correo" name="correo" placeholder="Correo Electrónico" class="input-form" required/><br>
          <i class="fas fa-lock"></i>
          <input type="password" id="clave" name="clave" placeholder="Contraseña"class="input-form" required/><br>
          <p id='messages-error'></p>
          <button  type="submit" id="btn-ingresar">INGRESAR</button>
          <p>O ingresa con</p>
          <button type="button" id="btn-fb" class="redes"><i class="fab fa-facebook-f"></i></button>
          <button type="button" id="btn-gmail" class="redes"><i class="fab fa-google"></i></button>
          <p>¿Todavia no eres miembro?</p>
          <a id="nueva-cuenta" href="#/Registro">Únete Ahora</a>
        </form>
      </div>
    </div>
  `;

  /* En vez de crear un elemento div al que le sobreescribimos toda la section
  creamos un fragmento, del que solo se verán los hijos en el dom
  de esta forma, se ve más limpio nuestro html
  y ya no queda el div > section, si no solo la seccion */
  const fragment = document.createDocumentFragment();
  const section = document.createElement('section');
  section.setAttribute('id', 'view-login-desktop');
  section.innerHTML = logInTmplt;
  fragment.appendChild(section);

  /* Inicio de sesión con Gmail.
  Cambios: Adjunto directamente el 1er .then a la primera promesa, que va encandenando
  las demás promesas. Así, el 2do .then está asociado a la respuesta de la 2da promesa
  el .catch atrapa el error de cualquiera  */

  const btnGmail = fragment.querySelector('#btn-gmail');
  btnGmail.addEventListener('click', (e) => {
    e.preventDefault();
    logInGm()
      .then((result) => {
        if (result.additionalUserInfo.isNewUser === true) {
          createUser(
            result.user.providerData[0].uid,
            result.user.providerData[0].displayName,
            result.user.providerData[0].email,
            result.user.providerData[0].photoURL,
            '5to de primaria',
            'Compartiendo conocimiento',
          );
        } else {
          console.log('Usuario ya existe, no es necesario crear uno nuevo. Ir a mi perfil');
        }
      })
      .then(() => {
        console.log('Se creó usuario');
        window.location.hash = '#/Inicio';
      })
      .catch((error) => {
        console.error(error);
      });
  });

  /* Inicio de sesión con Facebook */
  const btnFb = fragment.querySelector('#btn-fb');
  btnFb.addEventListener('click', (e) => {
    e.preventDefault();
    logInFb()
      .then((result) => {
        if (result.additionalUserInfo.isNewUser === true) {
          createUser(
            /* Esta bien acceder de esta forma? o Es preferible almacenar esa ruta
            al array? */
            result.user.providerData[0].uid,
            result.user.providerData[0].displayName,
            result.user.providerData[0].email,
            result.user.providerData[0].photoURL,
            '5to de primaria',
            'Compartiendo conocimiento',
          );
        } else {
          console.log('Usuario ya existe, no es necesario crear uno nuevo');
        }
      })
      .then(() => {
        console.log('Se creó usuario');
        window.location.hash = '#/Inicio';
      })
      .catch((error) => {
        console.log('error login', error);
      });
  });

  // Creamos función para ingresar con una cuenta ya creada
  const btnIngresar = fragment.querySelector('#form-login');
  btnIngresar.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = fragment.querySelector('#correo').value;
    const password = fragment.querySelector('#clave').value;
    logInUser(email, password)
      .then(() => {
        fragment.querySelector('#messages-error').innerHTML = '';
        window.location.hash = '#/Inicio';
      })
      .catch(() => {
        fragment.querySelector('#messages-error').innerHTML = '⚠️ Correo o clave no son correctos.';
        alert('credenciales incorrectos');
      });
  });
  return fragment;
};
