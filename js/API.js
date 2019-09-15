class Api {

    async obtenerDatos() {

        let total = 375;
        // obtener los datos desde la API
        let datos = await fetch(`https://api.datos.gob.mx/v1/precio.gasolina.publico?pageSize=${total}`);
        // retornar respuesta como JSON
        let resJson = await datos.json();
        resJson = resJson.results;

        return {
            resJson
        };
    }
}
