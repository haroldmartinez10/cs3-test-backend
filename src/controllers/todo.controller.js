import todo from '../models/todo.js';

export const getTodos = async (_, res) => {
  try {
    const todos = await todo.find();
    res.status(202).json(todos);
  } catch (error) {
    res.status(404).json({
      message: error.message || 'Something goes wrong retrieving the todos'
    })
  }
}

export const createTodo = async (req, res) => {
  if (!req.body.name) {
    return res.status(404).send({
      message: 'Content cannot be empty'
    })
  }

  if (!req.body.description) {
    return res.status(404).send({
      message: 'Content cannot be empty'
    })
  }

  try {
    const newTodo = new todo({
      name: req.body.name,
      description: req.body.description,
    })

    const todoSaved = await newTodo.save();
    res.status(202).json(todoSaved);
  } catch (error) {
    res.status(404).json({
      message: error.message || 'Something goes wrong creating a todo'
    })
  }
}

export const createFiveTodos = async (req, res) => {
  try {
    const arrayTodos = Array.from({ length: 5 }, (_, i) => {
      return new todo({
        name: `Todo ${i}`,
        description: `Description ${i}`,
      })
    });
    const newTodos = await todo.insertMany(arrayTodos);
    res.status(202).json(newTodos);
  } catch (error) {
    res.status(404).json({
      message: error.message || 'Something goes wrong creating a todo'
    })
  }
}

export const getTodoById = async (req, res) => {
  try {
    const todoFound = await todo.findById(req.params.id);
    console.log(todoFound)
    if(!todoFound) return res.status(404).json({
      message: `Todo with id: ${req.params.id} does not exists`
    });
    res.status(202).json(todoFound);
  } catch (error) {
    res.status(404).json({
      message: 'Something goes wrong retrieving the todo'
    })
  }
}

export const updateTodoById = async (req, res) => {
  try {
    const { name, description, completed } = req.body;
    const todoFound = await todo.findById(req.params.id);
    if(!todoFound) return res.status(404).json({
      message: `Todo with id: ${req.params.id} does not exists`
    });
    await todo.updateOne({ _id: req.params.id }, {
      name,
      description,
      completed
    });

    res.status(202).json({
      message: `Todo with id: ${req.params.id} was updated successfully`
    });
  } catch (error) {
    res.status(404).json({
      message: error.message || 'Something goes wrong updating the todo'
    })
  }
}

export const deleteTodoById = async (req, res) => {
  try {
    const todoFound = await todo.findByIdAndDelete(req.params.id);
    if(!todoFound) return res.status(204).json({
      message: `Todo with id: ${req.params.id} does not exists`
    });
    res.status(202).json({
      message: `Todo with id: ${req.params.id} was deleted successfully`
    });
  } catch (error) {
    res.status(404).json({
      message: error.message || 'Something goes wrong deleting the todo'
    })
  }
}
