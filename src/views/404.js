const notFoundView = () => {
  const notFoundTmplt = `
    <h2> 404 </h2>
    <h1> Página no encontrada </h1>
    `;

  const fragment = document.createDocumentFragment();
  const section = document.createElement('section');
  section.setAttribute('id', 'notFound');
  section.innerHTML = notFoundTmplt;
  return fragment;
};

export { notFoundView };
