import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import routes from "./routes/index.js";
import cors from "cors";

dotenv.config();
const server = express(); //server

//use cors
server.use(cors());

// get body
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

// Data base connection
const uri = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.lwh3p.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose
  .connect(uri, options)
  .then(() => console.log("Data base connected"))
  .catch((e) => console.log("error db:", e));

// routes
server.use("/", routes);

// route middlewares
server.get("/", (req, res) => {
  res.json({
    estado: true,
    mensaje: "It works!",
  });
});

// Starts server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on: ${PORT}`);
});
