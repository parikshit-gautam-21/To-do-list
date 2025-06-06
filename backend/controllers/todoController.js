const Todo = require('../models/Todo');

// @desc    Get todos for logged in user
// @route   GET /api/todos
// @access  Private
exports.getTodos = async (req, res) => {
  const todos = await Todo.find({ user: req.user.id });
  res.json(todos);
};

// @desc    Create new todo
// @route   POST /api/todos
// @access  Private
exports.createTodo = async (req, res) => {
  if (!req.body.text) {
    return res.status(400).json({ message: 'Please add a text field' });
  }

  const todo = await Todo.create({
    user: req.user.id,
    text: req.body.text,
  });

  res.status(201).json(todo);
};

// @desc    Update todo
// @route   PUT /api/todos/:id
// @access  Private
exports.updateTodo = async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  if (todo.user.toString() !== req.user.id) {
    return res.status(401).json({ message: 'User not authorized' });
  }

  todo.text = req.body.text ?? todo.text;
  todo.completed = req.body.completed ?? todo.completed;

  const updatedTodo = await todo.save();
  res.json(updatedTodo);
};

// @desc    Delete todo
// @route   DELETE /api/todos/:id
// @access  Private
exports.deleteTodo = async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  if (todo.user.toString() !== req.user.id) {
    return res.status(401).json({ message: 'User not authorized' });
  }

  await todo.deleteOne();
  res.json({ message: 'Todo removed' });
};
