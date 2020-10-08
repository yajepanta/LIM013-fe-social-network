import { logIn, logInFb, logInGm } from '../model/firebase-auth.js';

import { createUser } from '../model/firebase-user.js';

export const loginPrincipal = () => {
  const viewLogin = ` 
  <section id="view-login-desktop"> 
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
  </section>
  `;

  const div = document.createElement('div');
  div.innerHTML = viewLogin;

  /* Inicio de sesión con Gmail */
  const btnGmail = div.querySelector('#btn-gmail');

  btnGmail.addEventListener('click', (e) => {
    e.preventDefault();
    logInGm()
      .then((result) => {
        console.log(result);
        if (result.additionalUserInfo.isNewUser === true) {
          createUser(
            result.user.providerData[0].uid,
            result.user.providerData[0].displayName,
            result.user.providerData[0].email,
            result.user.providerData[0].photoURL,
            '5to de primaria',
            'Compartiendo conocimiento',
          ).then(() => {
            console.log('Se creo usuario');
            window.location.hash = '#/Inicio';
          });
        } else {
          console.log('Usuario ya existe, no es necesario crear uno nuevo. Ir a mi perfil');
        }
      })
      .catch((error) => {
        console.log('error login', error);
      });
  });

  /* Inicio de sesión con Facebook */
  const btnFb = div.querySelector('#btn-fb');

  btnFb.addEventListener('click', (e) => {
    e.preventDefault();
    logInFb()
      .then((result) => {
        console.log(result);
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
          ).then(() => {
            console.log('Se creo usuario');
            window.location.hash = '#/Inicio';
          });
        } else {
          console.log('Usuario ya existe, no es necesario crear uno nuevo');
        }
      })
      .catch((error) => {
        console.log('error login', error);
      });
  });

  // Creamos función para ingresar con una cuenta ya creada
  const btnIngresar = div.querySelector('#form-login');
  btnIngresar.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = div.querySelector('#correo').value;
    const password = div.querySelector('#clave').value;
    logIn(email, password)
      .then(() => {
        div.querySelector('#messages-error').innerHTML = '';
        window.location.hash = '#/Inicio';
      })
      .catch(() => {
        div.querySelector('#messages-error').innerHTML = '⚠️ Correo o clave no son correctos.';
        alert('credenciales incorrectos');
      });
  });
  return div;
};
