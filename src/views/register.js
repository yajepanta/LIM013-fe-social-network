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
        <li>
          <button type="button" id='btn-register' class='button-post'>REGISTRARTE</button>
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
    const name = fragment.querySelector('#form-name').value;
    const lastName = fragment.querySelector('#form-lastname').value;
    const fullName = name + lastName;
    const email = fragment.querySelector('#form-email').value;
    const pass = fragment.querySelector('#form-pass').value;
    const passCheck = fragment.querySelector('#form-pass-check').value;
    if (name === '') {
      alert('name');
    } else if (lastName === '') {
      alert('lastName');
    } else if (email === '') {
      alert('email');
    } else if (pass === '') {
      alert('falta pass');
    } else if (pass !== passCheck) {
      alert('pass diferente');
    } else {
      registerUser(email, pass)
        // Result es "user" con todos los datos que luego se almacenan en createUser
        .then((result) => { createUser(result.user.uid, fullName, email, 'img/perfil.png', 'primaria/secundaria', 'Sede'); })
        // Recibe un undefined. por que?
        .then(() => logInUser(email, pass))
        .then(() => { window.location.hash = '#/Inicio'; })
        .catch(error => console.log(error));
    }
  });

  return fragment;
};

/*
      registerUser(email, pass)
        .then((result) => {
          console.log(result);
       createUser(result.user.uid, fullName, email, 'img/perfil.png', 'primaria/secundaria', 'Sede')
            .then(() => {
              console.log('se creó el usuario');
            });
          logInUser(email, pass)
            .then(() => {
              window.location.hash = '#/Inicio';
            });
        })
        .catch(() => {
          console.log('Cuenta ya existe');
        });
    }
  });

         */
