import { components } from '../views/index.js';
import { dataUser } from '../model/firebase-user.js';

//  Función de cambios de rutas

const changeView = (route) => {
  window.location.hash = route;
  const headerElem = document.querySelector('#nav');
  const aside = document.body.getElementsByTagName('aside')[0];
  const container = document.getElementById('container');
  container.innerHTML = '';

  switch (route) {
    case '': {
      aside.classList.remove('hidden');
      container.appendChild(components.logIn());
      break;
    }
    case '#/Cerrar': {
      headerElem.classList.remove('show');
      aside.classList.remove('hidden');
      container.appendChild(components.logIn());
      break;
    }
    case '#/Registro': {
      aside.classList.remove('hidden');
      container.appendChild(components.register());
      break;
    }
    case '#/Inicio': {
      headerElem.classList.add('show');
      aside.classList.add('hidden');
      // Usuario logueado
      const currentUser = firebase.auth().currentUser;
      dataUser(currentUser.uid)
        .then((doc) => {
          container.appendChild(components.timeline(doc.data()));
        })
        .catch(err => console.error(err));

      break;
    }
    case '#/Perfil': {
      headerElem.classList.add('show');
      aside.classList.add('hidden');
      container.appendChild(components.profile());
      break;
    }
    default: {
      container.appendChild(components.notFound());
      break;
    }
  }
};

export { changeView };
