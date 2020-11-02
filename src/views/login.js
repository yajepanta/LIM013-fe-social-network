import { logInUser, logInGm } from '../model/firebase-auth.js';

import { createUser } from '../model/firebase-user.js';

export const logInView = () => {
  const logInTmplt = `  
      <div class='saludo'>
        <h1>¡Bienvenido a InnovaSocial!</h1>
        <p>En este lugar podrás comunicarte <br> y compartir recursos.</p>
      </div>
      <div class= 'main-form'>
        <form id="form-login">
          <ul class="form-login">
            <li>
              <i class="fas fa-envelope-square"></i>
              <input type="text" id="email" name="correo" placeholder="Correo electrónico" class="input-form" required/>
            </li>
            <li>
              <i class="fas fa-lock"></i>
              <input type="password" id="password" name="clave" placeholder="Contraseña"class="input-form" required/>         
            </li>
            <li>
              <p class='msg-error'></p>
              <button  type="submit" id="btn-ingresar" class='btn-ingresar'>INGRESAR</button>
            </li>
            <li> 
                <br>
                <p> O también</p>
            </li>    
            <li>
              <button type="button" id="btn-gmail" class="redes"><img src='https://d2k1ftgv7pobq7.cloudfront.net/meta/c/p/res/images/8215f6659adc202403198fef903a447e/sign-in-with-google.svg'> Ingresar con Google</button>
            </li>
            <li>
              <p>¿Todavía no eres miembro? <a id="register-link" href="#/Registro">Únete ahora</a></p>  
            </li>  
          </ul>  
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
            result.user.uid,
            result.user.providerData[0].displayName,
            result.user.providerData[0].email,
            result.user.providerData[0].photoURL,
            '',
            '',
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

  // Creamos función para ingresar con una cuenta ya creada
  const btnIngresar = fragment.querySelector('#form-login');
  btnIngresar.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = section.querySelector('#email').value;
    const password = section.querySelector('#password').value;
    logInUser(email, password)
      .then(() => {
        section.querySelector('#messages-error').innerHTML = '';
        window.location.hash = '#/Inicio';
      })
      .catch(() => {
        section.querySelector('.msg-error').innerHTML = '⚠️ Correo o clave no son correctos.';
        alert('credenciales incorrectos');
      });
  });
  return fragment;
};
