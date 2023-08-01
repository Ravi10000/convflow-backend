require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");
const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.DB_URI)
  .catch(({ message }) =>
    console.error("😐 initial connection error: 👇 \n", message)
  );
mongoose.connection.on("error", ({ message }) => {
  console.error("😐 connection error: 👇 \n", message);
});
mongoose.connection.once("open", () => {
  console.log("connected to database 🎉");
});

app.get("/", (_, res) => res.send("👋 welcome to the api"));
app.get("/api", (req, res) => {
  res.send("Hello World");
});

app.use("/api/contact", require("./routes/contact-form-content.route"));
app.use(require("./utilities/handle-error").errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`🟢 http://localhost:${process.env.PORT}/api`);
});
