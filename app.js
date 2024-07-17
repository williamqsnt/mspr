const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.use("/api/avoirRole", require("./routes/AvoirRole"));
app.use("/api/conseil", require("./routes/Conseil"));
app.use("/api/conversation", require("./routes/Conversation"));
app.use("/api/gardiennage", require("./routes/Gardiennage"));
app.use("/api/message", require("./routes/Message"));
app.use("/api/plante", require("./routes/Plante"));
app.use("/api/role", require("./routes/Role"));
app.use("/api/utilisateur", require("./routes/Utilisateur"));

app.get("/", (req, res) => {
  res.send("Le serveur Express a démaré !");
});

app.listen(port, () => {
  console.log(`Le serveur est entrain de tourné sur le port : ${port}`);
});
