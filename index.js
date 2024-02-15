const express = require('express');
const app = express();

const sequelize = require('./sequelize');

const cors = require('cors');
app.use(cors());

app.use(express.json());

const todoRoutes = require('./Routes/todoRoutes');
app.use('/todo', todoRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Testando API' });
});

async function initializeDatabase() {
    try {
      console.log('Iniciando sincronização do banco de dados...');
      await sequelize.sync();
      console.log('Banco de dados sincronizado com sucesso.');
    } catch (error) {
      console.error('Erro ao sincronizar o banco de dados:', error);
    }
}

initializeDatabase();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

