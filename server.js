const app = require("./app");
const connectDatabase = require("./config/database");

const dotenv = require("dotenv");

// Handle Uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err.stack}`);
  console.log("Servidor apagado debido a una excepcion no controlada");
  process.exit(1);
});

//configurando el inicio del config
dotenv.config({ path: "backend/config/config.env" });

// Conectando a la base de datos
connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(
    `Servidor iniciado en el puerto: ${process.env.PORT} en modo ${process.env.NODE_ENV} .`
  );
});

// Handle Unhundle
process.on("unhandledRjection", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log("Servidor caido por una promesa no manejada");
  server.close(() => {
    process.exit(1);
  });
});
