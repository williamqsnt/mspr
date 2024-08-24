// socket.js
const { Server } = require("socket.io");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

function setupSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true
    }
  });

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
  });

  return io;
}

module.exports = setupSocket;
