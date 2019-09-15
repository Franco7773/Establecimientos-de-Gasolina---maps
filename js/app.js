const Ui = new UI();

document.addEventListener('DOMContentLoaded', () => {

  Ui.mostrarEstablecimientos();
});
// Habilitar búsqueda de establecimientos
let buscador = document.querySelector('#buscar input');
buscador.addEventListener('input', () => {

  if (buscador.value.length > 3) {
    // Buscar en la API
    Ui.obtenerSugerencias(buscador.value);
  } else {

    Ui.mostrarEstablecimientos();
  }
});
