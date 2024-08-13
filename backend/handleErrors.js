const handleErrors = (code) => {
  switch (code) {
    case "22P02":
      return {
        status: 400,
        message: "El formato del parámetro proporcionado no es válido.",
      };
    case "23502":
      return {
        status: 400,
        message:
          "Faltan datos obligatorios en la consulta o en el campo de la tabla.",
      };
    case "400":
      return {
        status: 400,
        message: "Datos insuficientes en la solicitud.",
      };
    case "404":
      return {
        status: 404,
        message: "El registro solicitado no se encontró en la base de datos.",
      };
    default:
      return {
        status: 500,
        message:
          "Ocurrió un error interno en el servidor. Por favor, intente nuevamente más tarde.",
      };
  }
};

module.exports = { handleErrors };
