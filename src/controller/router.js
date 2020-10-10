import { components } from '../views/index.js';

//  Función de cambios de rutas

const changeView = (route) => {
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
      headerElem.classList.remove('mostrar');
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
      headerElem.classList.add('mostrar');
      aside.classList.add('hidden');
      container.appendChild(components.timeline());
      break;
    }
    case '#/Perfil': {
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

/* const changeView = (hash) => {
  window.location.hash = hash;
  const headerElem = document.querySelector('#nav');
  const aside = document.body.getElementsByTagName('aside')[0];
  const container = document.getElementById('container');
  container.innerHTML = '';
  switch (hash) {
    case '': {
      aside.classList.remove('hidden');
      container.appendChild(components.login());
      break;
    }
    case '#/Cerrar': {
      headerElem.classList.remove('mostrar');
      aside.classList.remove('hidden');
      container.appendChild(components.login());
      break;
    }
    case '#/Registro': {
      aside.classList.remove('hidden');
      container.appendChild(components.register());
      break;
    }
    case '#/Inicio': {
      headerElem.classList.add('mostrar');
      aside.classList.add('hidden');
      container.appendChild(components.timeline());
      break;
    }
    case '#/Perfil': {
      aside.classList.add('hidden');
      container.appendChild(components.perfil());
      break;
    }
    default: {
      container.innerHTML = 'no encontrado';
      break;
    }
  }
}; */
