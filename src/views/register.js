import { registerUser, logInUser } from '../model/firebase-auth.js';

import { createUser } from '../model/firebase-user.js';

export const registerView = () => {
  const registerTmplt = `
    <div class="saludo">
        <h1>Registrarte</h1>
        <p>Es rápido y fácil.</p>
      </div>
    <form> <!-- action='/action_page.php' -->
      <ul class='form-flex'>
        <li>
          <label for='form-name'></label>
          <input type='text' id='form-name' name='form-name' placeholder='Escribe tu nombre'>
        </li>
        <li>
          <label for='form-lastname'></label>
          <input type='text' id='form-lastname' name='form-lastname' placeholder='Escribe tus apellidos'>
        </li>
        <li>
          <label for='form-email'></label>
          <input type='text' id='form-email' name='form-email' placeholder='Escribe tu correo'> 
        </li>
        <li>
          <label for='form-pass'></label>
          <input type='text' id='form-pass' name='form-pass' placeholder='Escribe una contraseña segura'>
        </li>
        <li>
          <label for='form-pass-check'></label>
          <input type='text' id='form-pass-check' name='form-pass-check' placeholder='Vuelve a escribir la contraseña'>
        </li>
        <label for="campus">Campus: </label>
        <select id='campus'>
          <option value='ate'>Ate</option>
          <option value='callao'>Callao</option>
          <option value='rimac'>Rímac</option>
          <option value='ves'>Villa El Salvador</option> 
        </select>
        <li>
          <p class='msg-error hidden'> ⚠️ Por favor, completa todos los campos </p>
          <p class='msg-error-pass hidden'> ⚠️ Las contraseñas no coinciden </p> <br>
          <button type="button" id='btn-register' class='post-btn'>REGISTRARTE</button>
        </li>  
      </ul> 
    </form>
 `;

  const fragment = document.createDocumentFragment();
  const section = document.createElement('section');
  section.setAttribute('id', 'section-register');
  section.innerHTML = registerTmplt;
  fragment.appendChild(section);

  /* Crear nueva cuenta de usuario */
  const btnRegister = fragment.querySelector('#btn-register');
  btnRegister.addEventListener('click', (e) => {
    e.preventDefault();
    const name = section.querySelector('#form-name').value;
    const lastName = section.querySelector('#form-lastname').value;
    const fullName = `${name} ${lastName}`;
    const email = section.querySelector('#form-email').value;
    const pass = section.querySelector('#form-pass').value;
    const passCheck = section.querySelector('#form-pass-check').value;
    const campus = section.querySelector('#campus').value;
    const msgError = section.querySelector('.msg-error');
    const msgErrorPass = section.querySelector('.msg-error-pass');

    if (name === '') {
      msgError.classList.remove('hidden');
    } else if (lastName === '') {
      msgError.classList.remove('hidden');
    } else if (email === '') {
      msgError.classList.remove('hidden');
    } else if (pass === '') {
      msgError.classList.remove('hidden');
    } else if (pass !== passCheck) {
      msgErrorPass.classList.remove('hidden');
    } else {
      registerUser(email, pass)
        .then((result) => { createUser(result.user.uid, fullName, email, 'noPhoto', 'primaria/secundaria', campus); })
        .then(() => logInUser(email, pass))
        .then(() => { window.location.hash = '#/Inicio'; })
        .catch(err => console.error(err));
    }
  });

  return fragment;
};
