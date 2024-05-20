import axios from 'axios';

// Crear una instancia de Axios con la configuración base
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000', // Cambia esto a la URL de tu servidor
  timeout: 10000, // Tiempo de espera para las solicitudes (opcional)
  headers: {
    'Content-Type': 'application/json',
    // Puedes agregar otros encabezados como tokens de autenticación, si es necesario
  },
});

// Función para obtener categorías
const obtenerCategorias = () => {
  return axiosInstance.get('/categories'); // Solicitud GET al endpoint de categorías
};

// Función para obtener artículos
const obtenerArticulos = () => {
  return axiosInstance.get('/articles'); // Solicitud GET al endpoint de artículos
};

// Función para obtener comentarios de un artículo
const obtenerComentarios = (articleId) => {
  return axiosInstance.get(`/articles/${articleId}/comments`); // Solicitud GET al endpoint de comentarios del artículo
};

// Función para enviar un nuevo comentario
const enviarComentario = (articleId, comentario) => {
  return axiosInstance.post(`/articles/${articleId}/comments`, { comentario }); // Solicitud POST al endpoint de comentarios del artículo
};

// Exportar la instancia de Axios y las funciones
export { axiosInstance, obtenerCategorias, obtenerArticulos, obtenerComentarios, enviarComentario };