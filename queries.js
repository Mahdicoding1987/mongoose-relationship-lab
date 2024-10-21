/*------------------------------ Starter Code ------------------------------*/

const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');

const Todo = require('./models/todo.js');
const User  = require('./models/user.js')

const connect = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB');
  await runQueries()

  await mongoose.disconnect();
  console.log('Disconnected from MongoDB');
  process.exit();
};

connect()

/*----------------------------- Query Functions -----------------------------*/

////////////////////////////////CREATE TODO////////////////////////////////

const createTodo = async () => {
  const todoData = {
    text: "learn React",
    isComplete: false,
  };
  const todo = await Todo.create(todoData);
  console.log("New todo:", todo);
};

const findTodos = async () => {
  const todos = await Todo.find({}).populate("assignee");;
  console.log("All todos:", todos);
};

/*----------------------------------Sub Tasks--------------------------------*/

const createSubtask = async () => {
    // 
    // todo ID is below:
    const todoId = "671634ec55f27841245831d3";
    // Look up the todo by id, assign the returned object to `todo`
    const todo = await Todo.findById(todoId);
    // Create a new sub-task object:
    const subtaskData = {
      text: "Learn how props work",
      isComplete: false,
    };
  
    // Push the new sub-task data into the subTasks array on the todo:
    const subtask = todo.subtasks.push(subtaskData);
    // Save the parent document:
    await todo.save();
    console.log("Modified todo:", todo);
  };

  //////////////////// Find a Subtask ////////////////////

  const findSubtask = async () => {
    const todoId = '671634ec55f27841245831d3';  // Replace with an existing Todo ID
    const subTaskId = '671635786ddb4f3a20b7e348'; // Replace with an existing Subtask ID
  
    const todo = await Todo.findById(todoId);
    const subTask = todo.subtasks.id(subTaskId);
  
    console.log('Subdocument:', subTask);
  };

  //////////////////// Remove a Subtask ////////////////////

  const removeSubtask = async () => {
    const todoId = '671634ec55f27841245831d3';
    const subtaskId = '671635786ddb4f3a20b7e348';
  
    const todo = await Todo.findById(todoId);
    todo.subtasks.pull(subtaskId);
    await todo.save();
  
    console.log('Updated document:', todo);
  };

  //////////////////// Update a Subtask ////////////////////

  const updateSubtask = async () => {
    const todoId = '671634ec55f27841245831d3';
    const subtaskId = '671638f3f84ba222ebcd9257';
  
    const todo = await Todo.findById(todoId);
    const subtask = todo.subtasks.id(subtaskId);
  
    subtask.isComplete = true;
    
    await todo.save();
  
    console.log('Updated document:', todo);
  };

/////////////////////////FINDING PARENT FROM A CHILD//////////////////////////////

const findParentAndRemoveSubtask = async () => {
    const todo = await Todo.findOne({
      'subtasks.text': 'Learn how props work'
    });
  
    const subtask = todo.subtasks.find((element) => {
      return element.text === 'Learn how props work'
    });
  
    subtask.deleteOne();
  
    await todo.save();
    console.log('Updated todo:', todo);
  };

  /////////////////////////ADDING REFRENCE//////////////////////////////

  const createUser = async () => {
    const userData = {
      name: "Alex",
      email: "alex@mail.com",
    };

    const user = await User.create(userData);
    console.log("New user:", user);

  };

  ////////////////////////////ADDING REFRENCE//////////////////////////////

  const assignTodo = async () => {
    const todoId = '671634ec55f27841245831d3';
    const userId = '6716408c456fab6374a765d0';
  
    const updatedTodo = await Todo.findByIdAndUpdate(
      todoId,
      { assignee: userId },
      { new: true }
    );
  
    console.log('Updated document:', updatedTodo);
  };

//parent document ID: 671634ec55f27841245831d3
/*------------------------------- Run Queries -------------------------------*/

const runQueries = async () => {
  console.log('Queries running.');
  //await createTodo();
  //await createSubtask();
  //await findSubtask();
  //await removeSubtask()
  //await updateSubtask();
  //await findParentAndRemoveSubtask();
  //await createUser();
  //await assignTodo();
  //await findTodos();
};