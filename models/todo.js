// models/todo.js
const mongoose = require('mongoose');

const subtaskSchema = new mongoose.Schema({
    text: String,
    isComplete: Boolean,
  });

const todoSchema = new mongoose.Schema({
  text: String,
  isComplete: Boolean,
  //subtasks: [subtaskSchema],
    // Add a new field to reference a User:
    assignee: { type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' // Reference to the User model
      }
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;