const mongoose = require("mongoose");

//const DB_URI = "mongodb://localhost:27017/cletas";

/*mongoose.connect(URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("BD conectada");
}); */

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_LOCAL_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((con) => {
      console.log(
        `Ya está conectada las base de datos MongoDB a localhost: ${con.connection.host}`
      );
    });
};

module.exports = connectDatabase;
