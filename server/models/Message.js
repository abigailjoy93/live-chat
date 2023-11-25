const { Schema, model }= require('mongoose');

// Mongoose models
const MessageSchema = new Schema({
    Message: {
  client_offset: String,
  content: String,
    }
});

const Message = model("Message", MessageSchema);

module.exports = Message;