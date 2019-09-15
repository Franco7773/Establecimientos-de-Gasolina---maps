class UI {
  constructor() {

    // Instanciar la API
    this.Api = new Api();

    // Crear los markers con layerGroup
    this.Markers = new L.LayerGroup();

    // Iniciar el mapa
    this.mapa = this.inicializarMapa();
  }
  // Inicializar y obtener la propiedad del mapa
  inicializarMapa() {

    let map = L.map('mapa').setView([19.390519, -99.3739778], 6);
    let enlaceMapa = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
    
    L.tileLayer(

      'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'o ' + enlaceMapa + 'Contributors',
        maxZoom: 18,
      }).addTo(map);
      
    return map;
  }

  mostrarEstablecimientos() {
    
    this.Api.obtenerDatos()
      .then(datos => {
        
        let resultado = datos.resJson;
        // Ejecutar la función para mostrar los pines
        this.mostrarPines(resultado);
      })
  }

  mostrarPines(datos) {
    // Limpiar los markers
    this.Markers.clearLayers();
    // Recorrer los establecimientos
    datos.forEach(dato => {
      // destructuring
      let { latitude, longitude, calle, regular, premium } = dato;
      // Crear popup
      let opcionesPopUp = L.popup().setContent(`
        <p>Calle: ${calle}</p>
        <p><b>Regular:</b> $ ${regular}</p>
        <p><b>Premium:</b> $ ${premium}</p>
      `);
      // Agregar PIN
      let Marker = new L.marker([
        parseFloat(latitude),
        parseFloat(longitude)
      ]).bindPopup(opcionesPopUp);

      this.Markers.addLayer(Marker);
    });
    this.Markers.addTo(this.mapa);
  }
  // Buscador 
  obtenerSugerencias(busqueda) {

    this.Api.obtenerDatos()
      .then(datos => {
        // Obtener los datos
        let resultados = datos.resJson;
        // Enviar el JSON y la busqueda para el filtrado
        this.filtrarSugerencias(resultados, busqueda);
      })
  }
  // Filtra las sugerencias en base al Input
  filtrarSugerencias(resultado, busqueda) {
    // Filtrar con .filter()
    let filtro = resultado.filter(filtro => filtro.calle.indexOf(busqueda) !== -1);

    this.mostrarPines(filtro);
  }
}
