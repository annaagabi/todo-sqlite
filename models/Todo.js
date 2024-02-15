const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize.js');

const Todo = sequelize.define('Todo', {
  tarefa: {
    type: DataTypes.STRING,
    allowNull: false
  },
  desc: {
    type: DataTypes.STRING
  },
  categoria: {
    type: DataTypes.STRING
  },
  situacao: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

module.exports = Todo;
