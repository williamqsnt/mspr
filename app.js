const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.use("/api/utilisateur", require("./routes/Utilisateur"));

app.get("/", (req, res) => {
  res.send("Le serveur Express a démaré !");
});

app.listen(port, () => {
  console.log(`Le serveur est entrain de tourné sur le port : ${port}`);
});
