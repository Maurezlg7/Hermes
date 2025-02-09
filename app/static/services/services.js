class Services {
    constructor() {}

    async M_POST(datos, endpoint) {
        try {
            const response = await fetch("http://127.0.0.1:5000/" + endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(datos)
            });

            if (!response.ok) {
                throw new Error("Error en la petición: " + response.status);
            }

            const result = await response.json();
            console.log("Servidor envió con éxito la solicitud.", result);
            return result;
            
        } catch (error) {
            console.error("*Error: " + error);
        }
    }
}

export default Services;
