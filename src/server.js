require("dotenv").config();

const app = require("./app");
const { PORT = 8000 } = process.env;
console.log("port ", require("dotenv").config());
//connectdb
const connectDB = require("./db/connect");

// const listener = () => console.log(`Listening on Port ${PORT}!`);
// app.listen(PORT, listener);

const listener = async () => {
  try {
    console.log(process.env.PORT);
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () =>
      console.log(`Server is listening on port a  ${PORT}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

listener();
