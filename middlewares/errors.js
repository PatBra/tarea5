const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === "DEVELOPMENT") {
    res.status(err.statusCode).json({
      success: false,
      error: err,
      errorMessage: err.message,
      stack: err.stack,
    });
  }

  if (process.env.NODE_ENV === "PRODUCTION") {
    let error = { ...err };
    error.message = err.message;

    // Wrong Mongoose Object ID Error
    if (err.name === "CastError") {
      const message = `Recurso no encontrado, invalido: ${err.path}`;
      error = new ErrorHandler(message, 400);
    }

    // Handling Mongoose Validation Error
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((value) => value.message);
      error = new ErrorHandler(message, 400);
    }

    // Clave duplicada
    if (err.code === 11000) {
      constmessage = "Llave duplicada ${object.keys(err.keyValue)} ingresada";
    }

    //error JWT invalido
    if (err.name === "JsonWebTokenError") {
      const message = "Invalido JSON Web Token, intentelo de nuevo...!!!";
      error = new ErrorHandler(message, 400);
    }

    //error JWT expirado
    if (err.name === "TokenExpiredError") {
      const message = "JSON Web Token expirado, intentelo de nuevo...!!!";
      error = new ErrorHandler(message, 400);
    }

    res.status(error.statusCode).json({
      success: false,
      message: error.message || "Error en el servidor ",
    });
  }
};
