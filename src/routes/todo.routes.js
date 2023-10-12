import { Router } from 'express';
import * as todoController from '../controllers/todo.controller.js';

const router = Router();

router.get('/', todoController.getTodos);

router.post('/newTask', todoController.createTodo);

router.post('/newFiveTasks', todoController.createFiveTodos);

router.get('/:id', todoController.getTodoById);

router.patch('/:id', todoController.updateTodoById);  

router.delete('/:id', todoController.deleteTodoById);

export default router;  