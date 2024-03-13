const { PORT = 8000 } = process.env;
const app = require("./app");
//connectdb
const connectDB = require("./db/connect");

// const listener = () => console.log(`Listening on Port ${PORT}!`);
// app.listen(PORT, listener);

const listener = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port a  ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

listener();
