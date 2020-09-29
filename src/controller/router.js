import {components} from '../views/index.js'
// Funcion de cambios de rutas
export const changeView = (hash) => {
  const headerElem = document.querySelector('#nav');
  const container = document.getElementById('container');
  container.innerHTML = '';
/* falta un caso default */
  switch(hash){
    case "":
    case "#/Cerrar":{
      headerElem.classList.remove("mostrar");
      container.appendChild(components.login());
      break;
    }
    case"#/Registro":{
      container.appendChild(components.register());
      break;
    }
    case "#/Inicio":{
      headerElem.classList.add("mostrar");
      container.appendChild(components.timeline());
      break;
    }
    case "#/Perfil":{
      container.appendChild(components.perfil());
      break;
    }

  }
}
