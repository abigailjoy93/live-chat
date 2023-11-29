const { Schema, model }= require('mongoose');

// Mongoose models
const MessageSchema = new Schema({
    username: {
      type: String
    },
    room: {
      type: String
    },
    message: {
      type: String
    },
    createdtime: {
      type: String
    }
});

const Message = model("Message", MessageSchema);

module.exports = Message;