<template>
  <div class="comments-section">
    <h3 style="color: black;">Comentarios</h3>
    <div v-if="loading">Cargando comentarios...</div>
    <div v-if="error" class="error-message">{{ error }}</div>
    <ul v-if="comments.length > 0" class="comment-list">
      <li v-for="comment in comments" :key="comment.id" class="comment-item">
        <div class="comment-content">
          <p class="comment-text">{{ comment.comentario }}</p>
          <p><strong>{{ comment.fecha }}</strong></p>
        </div>
      </li>
    </ul>
    <p v-else style="color: black;">No hay comentarios disponibles.</p>

    <!-- Mensaje de éxito al cargar comentarios -->
    <p v-if="comments.length > 0 && !loading && !error" class="success-message">
      ¡Comentarios cargados correctamente!
    </p>

    <!-- Espacio para comentarios -->
    <div class="comment-space"></div>

    <!-- Formulario para crear un nuevo comentario -->
    <form @submit.prevent="submitComment" class="comment-form">
      <textarea v-model="newComment" rows="3" placeholder="Escribe tu comentario"></textarea>
      <button type="submit">Enviar comentario</button>
    </form>
  </div>
</template>


<script>
import { enviarComentario, obtenerComentarios } from '@/services/axiosService';

export default {
  name: 'CommentsComponent',
  props: ['articleId'],
  data() {
    return {
      comments: [],
      newComment: '',
      loading: false,
      error: null,
    };
  },
  mounted() {
    if (this.articleId) {
      this.fetchComments();
    }
  },
  methods: {
    async fetchComments() {
      this.loading = true;
      try {
        const response = await obtenerComentarios(this.articleId);
        this.comments = response.data;
        this.error = null;
      } catch (error) {
        console.error('Error al obtener comentarios:', error);
        this.error = 'Error al obtener comentarios. Por favor, inténtalo de nuevo.';
      } finally {
        this.loading = false;
      }
    },
    async submitComment() {
      if (this.checkAuthentication()) {
        try {
          await enviarComentario(this.articleId, this.newComment);
          this.newComment = '';
          await this.fetchComments();
        } catch (error) {
          console.error('Error al enviar comentario:', error);
          this.error = 'Error al enviar comentario. Por favor, inténtalo de nuevo.';
        }
      } else {
        alert('Para enviar un comentario, por favor inicia sesión o regístrate.');
      }
    },
    checkAuthentication() {
      // Implementa la lógica para verificar la autenticación del usuario
      // Retorna true si el usuario está autenticado, de lo contrario false
      // Aquí puedes simular la autenticación para pruebas
      return true; // Reemplaza con tu lógica real de autenticación
    },
  },
};
</script>

<style scoped>
/* Estilos CSS para el espacio entre el formulario de comentarios y la sección de comentarios */
.comment-space {
  margin-bottom: 20px;
}

.comment-text {
  color: black; /* Cambio del color de la letra de los comentarios a negro */
}
</style>

<style scoped>
.comments-section {
  width: 100%;
  max-width: 1000px;
  margin-top: 30px;
}

.comments-section h3 {
  margin-bottom: 10px;
  color: #ffffff;
}

.comment-list {
  list-style-type: none;
  padding: 0;
}

.comment-item {
  margin-bottom: 15px;
  border-bottom: 1px solid #555555;
  padding-bottom: 10px;
}

.comment-content {
  margin-bottom: 5px;
}

.comment-content p {
  margin: 5px 0;
  color: #ffffff;
}

.comment-form {
  margin-top: 20px;
}

.comment-form textarea {
  width: 100%;
  padding: 10px;
  font-size: 1em;
  border: 1px solid #cccccc;
  border-radius: 5px;
  resize: vertical;
}

.comment-form button {
  background-color: #007BFF;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

.error-message {
  color: red;
}
</style>
