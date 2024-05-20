// Importa axios y crea una instancia con la configuración base
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000', // Cambia esto a la URL de tu servidor
  timeout: 10000, // Tiempo de espera para las solicitudes (opcional)
  headers: {
    'Content-Type': 'application/json',
    // Puedes agregar otros encabezados como tokens de autenticación si es necesario
  },
});

// Función para iniciar sesión
const iniciarSesion = (correo, contraseña) => {
  return axiosInstance.post('/login', { correo, contraseña });
};

// Función para registrar un nuevo usuario
const registrarUsuario = (nombre, correo, contraseña) => {
  return axiosInstance.post('/register', { nombre, correo, contraseña });
};

// Función para obtener categorías
const obtenerCategorias = () => {
  return axiosInstance.get('/categories');
};

// Función para obtener artículos
const obtenerArticulos = () => {
  return axiosInstance.get('/articles');
};

// Función para obtener comentarios de un artículo
const obtenerComentarios = (articleId) => {
  return axiosInstance.get(`/articles/${articleId}/comments`);
};

// Función para enviar un nuevo comentario
const enviarComentario = (articleId, comentario) => {
  return axiosInstance.post(`/articles/${articleId}/comments`, { comentario });
};

export { axiosInstance, obtenerCategorias, obtenerArticulos, obtenerComentarios, enviarComentario, registrarUsuario,iniciarSesion };
