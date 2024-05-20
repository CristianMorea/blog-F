const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000; // Asegúrate de usar el puerto correcto

// Middleware para CORS
app.use(cors({
  origin: ['http://localhost:8080', 'http://localhost:8081'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Middleware para procesar body de JSON
app.use(bodyParser.json());

// Conexión a la base de datos MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'blog',
});

// Manejar errores de conexión
connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    process.exit(1); // Termina si hay un error de conexión
  } else {
    console.log('Conexión establecida con la base de datos MySQL');
  }
});

// Endpoint para obtener categorías
app.get('/categories', (req, res) => {
  const query = 'SELECT * FROM categoria';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener categorías:', err);
      res.status(500).send('Error al obtener categorías');
    } else {
      res.json(results);
    }
  });
});

// Endpoint para obtener artículos
app.get('/articles', (req, res) => {
  const query = 'SELECT * FROM articulo';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener artículos:', err);
      res.status(500).send('Error al obtener artículos');
    } else {
      res.json(results);
    }
  });
});

// Endpoint para registrar usuario
const insertUsuarioRegistro = (usuario, callback) => {
  const { nombre, correo, contraseña } = usuario;
  const query = `
    INSERT INTO usuario(nombre, correo, contraseña, rol_id, fecha_creacion)
    VALUES (?, ?, ?, 1, CURRENT_TIMESTAMP)
  `;
  connection.query(query, [nombre, correo, contraseña], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results.insertId); // Devuelve el ID del nuevo registro insertado
  });
};


// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
