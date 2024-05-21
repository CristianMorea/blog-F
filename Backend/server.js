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




// Función para insertar usuario en la base de datos
const insertUsuarioRegistro = (usuario, callback) => {
  const { nombre, correo, contraseña } = usuario;

  // Verificar si el correo ya está registrado
  const checkQuery = 'SELECT COUNT(*) AS count FROM usuario WHERE correo = ?';
  connection.query(checkQuery, [correo], (err, results) => {
    if (err) {
      // Error de consulta SQL
      return callback(err, null);
    }

    const count = results[0].count;
    if (count > 0) {
      // Si ya existe un usuario con este correo, retornar un error
      return callback(new Error('El correo electrónico ya está registrado'), null);
    }

    // Si el correo no está registrado, proceder con la inserción del usuario
    const insertQuery = `
      INSERT INTO usuario(nombre, correo, contraseña, rol_id, fecha_creacion)
      VALUES (?, ?, ?, 3, CURRENT_TIMESTAMP)
    `;
    connection.query(insertQuery, [nombre, correo, contraseña], (err, results) => {
      if (err) {
        // Error al insertar el usuario
        return callback(err, null);
      }
      callback(null, results.insertId); // Devuelve el ID del nuevo registro insertado
    });
  });
};


// Ruta para registrar usuario
app.post('/register', (req, res) => {
  const { nombre, email, contraseña } = req.body;

  // Llama a la función insertUsuarioRegistro para insertar el usuario
  insertUsuarioRegistro({ nombre, correo: email, contraseña }, (err, userId) => {
    if (err) {
      console.error('Error al insertar usuario:', err);
      if (err.message === 'El correo electrónico ya está registrado') {
        // Error: Correo electrónico duplicado
        return res.status(400).json({ message: 'El correo electrónico ya está registrado. Por favor, utiliza otro correo.' });
      }
      // Error interno del servidor
      return res.status(500).json({ message: 'Error interno al registrar usuario. Por favor, inténtalo de nuevo más tarde.' });
    }
    // Registro exitoso
    res.status(200).json({ userId });
  });
});


// Endpoint para iniciar sesión
app.post('/login', (req, res) => {
  const { correo, contraseña } = req.body;

  // Consulta SQL para verificar las credenciales del usuario
  const query = 'SELECT * FROM usuario WHERE correo = ? AND contraseña = ?';
  connection.query(query, [correo, contraseña], (err, results) => {
    if (err) {
      console.error('Error al iniciar sesión:', err);
      return res.status(500).json({ message: 'Error interno al intentar iniciar sesión' });
    }

    if (results.length === 0) {
      // No se encontró ningún usuario con las credenciales proporcionadas
      return res.status(401).json({ message: 'Credenciales incorrectas. Por favor, verifica tu correo y contraseña.' });
    }

    // Usuario encontrado, enviar respuesta con los datos del usuario
    const user = results[0];
    res.status(200).json({ userId: user.user_id, nombre: user.nombre }); // Ajuste aquí
  });
});


// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
