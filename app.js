const express = require("express");
const app = express();
const http = require("http"); 
const { Server } = require("socket.io"); // Importation de Socket.IO
const port = 3000;
const cors = require("cors");
const setupSwagger = require('./swagger');
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

app.use(cors());
app.use(express.json());

app.use("/api/conseil", require("./routes/Conseil"));
app.use("/api/conversation", require("./routes/Conversation"));
app.use("/api/gardiennage", require("./routes/Gardiennage"));
app.use("/api/message", require("./routes/Message"));
app.use("/api/plante", require("./routes/Plante"));
app.use("/api/utilisateur", require("./routes/Utilisateur"));

app.get("/", (req, res) => {
  res.send("Le serveur Express a démaré !");
});

setupSwagger(app);

// Configuration de Socket.IO
io.on("connection", (socket) => {
  console.log("Un utilisateur est connecté");

  // Écouter un événement pour récupérer les messages d'une conversation spécifique
  socket.on("recupererMessages", async (idConversation) => {
    try {
      // Appel à l'API Prisma pour récupérer les messages
      const messages = await prisma.message.findMany({
        where: {
          idConversation: parseInt(idConversation, 10),
        },
        orderBy: {
          dateEnvoi: 'asc',
        },
      });

      // Envoi des messages au client qui a fait la requête
      socket.emit("messagesRecus", messages);
    } catch (error) {
      console.error("Erreur lors de la récupération des messages:", error.message);
      socket.emit("erreur", "Erreur lors de la récupération des messages");
    }
  });

    // Gestion de la déconnexion
    socket.on("disconnect", () => {
      console.log("Un utilisateur s'est déconnecté");
    });
  })

server.listen(port, () => {
  console.log(`Le serveur est en train de tourner sur le port : ${port}`);
});
