const usersInRoom = [];

const createRoom = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected");

    socket.on("joinRoom", (roomName) => {
      socket.join(roomName);

      // Add the user to the list of users in the room
      usersInRoom.push(socket.id);

      // If there are at least two users, pair them randomly
      if (usersInRoom.length >= 2) {
        const [user1, user2] = getRandomPair(usersInRoom);
        io.to(user1).emit("pairUsers", { pairedWith: user2 });
        io.to(user2).emit("pairUsers", { pairedWith: user1 });
      }
    });

    socket.on("leaveRoom", (roomName) => {
      socket.leave(roomName);

      // Remove the user from the list of users in the room
      const index = usersInRoom.indexOf(socket.id);
      if (index !== -1) {
        usersInRoom.splice(index, 1);
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
      // Remove the user from the list of users in the room on disconnect
      const index = usersInRoom.indexOf(socket.id);
      if (index !== -1) {
        usersInRoom.splice(index, 1);
      }
    });
  });
};

// Function to get a random pair from an array
function getRandomPair(array) {
  const shuffledArray = array.sort(() => Math.random() - 0.5);
  return shuffledArray.slice(0, 2);
}

module.exports = { createRoom };
