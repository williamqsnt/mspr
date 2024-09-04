// app.js
const express = require("express");
const app = express();
const http = require("http");
const port = 3000;
const cors = require("cors");
const setupSwagger = require('./swagger');
const setupSocket = require('./socket'); // Importez la fonction de configuration Socket.IO

const server = http.createServer(app);

// Configurez Socket.IO et obtenez la référence de `io`
const io = setupSocket(server);

app.use(cors());
app.use(express.json());

// Assurez-vous d'utiliser la fonction de route correctement
app.use("/api/conseil", require("./routes/Conseil"));
app.use("/api/conversation", require("./routes/Conversation"));
app.use("/api/gardiennage", require("./routes/Gardiennage"));
app.use("/api/message", require("./routes/Message")(io)); // Passez `io` ici
app.use("/api/plante", require("./routes/Plante"));
app.use("/api/utilisateur", require("./routes/Utilisateur"));
app.use("/api/espece", require("./routes/Espece"));

app.get("/", (req, res) => {
  res.send("Le serveur Express a démarré !");
});

setupSwagger(app);

server.listen(port, () => {
  console.log(`Le serveur est en train de tourner sur le port : ${port}`);
});
