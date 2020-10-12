const profileView = () => {
  const profileTmplt = `
    <div class="portada">
      <div id="contendor-imagen">
       <img id="portada-mensaje" src="/img/frase.png">
     </div>
    </div>
    <div class="formulario-actualizacion">
      <form>
        <label for ="urlFoto">Foto de perfil</label><br>
        <input type="text" id="urlFoto" class="input-perfil" placeholder="URL de foto"/><br>
        <label for ="nombreUsuario">Nombre de Usuario</label><br>
        <input type="text" id="nombreUsuario"   class="input-perfil" placeholder="Nombres y apellidos"/><br>
        <label for ="gradoUsuario">Grado</label><br>
        <input type="text" id="gradoUsuario"  class="input-perfil" placeholder="Grado que cursa"/><br>
      </form>

    </div>
    `;

  const fragment = document.createDocumentFragment();
  const section = document.createElement('section');
  section.setAttribute('id', 'view-perfil');
  section.innerHTML = profileTmplt;
  fragment.appendChild(section);
  return fragment;
};

export { profileView };
