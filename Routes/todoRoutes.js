const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo.js');

router.post('/', async (req, res) => {
  const { tarefa, desc, categoria, situacao } = req.body;

  if (!tarefa) {
    res.status(422).json({ error: 'O titulo da tarefa é obrigatório!' });
    return;
  }

  try {
    const todo = await Todo.create({
      tarefa,
      desc,
      categoria,
      situacao: situacao || false
    });

    res.status(201).json({ message: 'Tarefa inserida no sistema com sucesso', todo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const todo = await Todo.findAll();
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const todo = await Todo.findByPk(id);

    if (!todo) {
      res.status(422).json({ message: 'A tarefa não foi encontrada' });
      return;
    }

    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch('/:id', async (req, res) => {
  const id = req.params.id;
  const { tarefa, desc, categoria, situacao } = req.body;

  const todoData = {
    tarefa,
    desc,
    categoria,
    situacao: situacao || false
  };

  try {
    const [updated] = await Todo.update(todoData, { where: { id } });

    if (updated === 0) {
      res.status(422).json({ message: 'A tarefa não foi encontrada' });
      return;
    }

    res.status(200).json(todoData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const todo = await Todo.findByPk(id);

    if (!todo) {
      res.status(404).json({ message: 'A tarefa não foi encontrada' });
      return;
    }

    await todo.destroy();
    res.status(200).json({ message: 'A tarefa removida com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
