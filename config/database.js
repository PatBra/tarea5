const mongoose = require("mongoose"); 

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
