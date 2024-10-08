<template>
  <div class="articles-container">
    <!-- Mostrar el artículo actual -->
    <div v-if="currentArticle" class="article-card">
      <h2 class="article-title">{{ currentArticle.titulo }}</h2>
      <p class="article-content">{{ currentArticle.contenido }}</p>
    </div>

    <!-- Mostrar mensaje si no hay artículos -->
    <p v-if="!currentArticle && errorMessage" class="error-message">{{ errorMessage }}</p>

    <!-- Integrar CommentsComponent solo si hay un artículo actual -->
    <comments-component v-if="currentArticle" :article-id="currentArticle.id" />

    <!-- Controles de paginación -->
    <div class="pagination-controls">
      <button @click="previousArticle" :disabled="currentPage === 1">Anterior</button>
      <span>{{ currentPage }}</span>
      <button @click="nextArticle" :disabled="currentPage === totalPageCount">Siguiente</button>
    </div>
  </div>
</template>

<script>
import { obtenerArticulos } from '@/services/axiosService';
import CommentsComponent from './CommentsComponent.vue';

export default {
  name: 'ArticlesComponent',
  components: {
    CommentsComponent,
  },
  data() {
    return {
      articles: [],
      errorMessage: '',
      currentPage: 1,
      articlesPerPage: 1, // Un artículo por página
    };
  },
  computed: {
    currentArticle() {
      const index = (this.currentPage - 1) * this.articlesPerPage;
      return this.articles[index];
    },
    totalPageCount() {
      return Math.ceil(this.articles.length / this.articlesPerPage);
    }
  },
  mounted() {
    this.fetchArticles();
  },
  methods: {
    async fetchArticles() {
      try {
        const response = await obtenerArticulos();
        this.articles = response.data;

        if (this.articles.length === 0) {
          this.errorMessage = 'No se encontraron artículos';
        } else {
          this.errorMessage = ''; // Limpiar el mensaje de error si hay datos
        }
      } catch (error) {
        console.error('Error al obtener artículos:', error);
        this.errorMessage = 'Error al obtener artículos. Inténtalo de nuevo más tarde.';
      }
    },
    previousArticle() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextArticle() {
      if (this.currentPage < this.totalPageCount) {
        this.currentPage++;
      }
    },
  },
};
</script>

<style scoped>
.articles-container {
  display: flex;
  flex-direction: column; /* Orientación vertical */
  justify-content: center; /* Centra verticalmente */
  align-items: center; /* Centra horizontalmente */
  min-height: calc(100vh - 80px); /* Altura mínima */
  padding: 20px;
  background-color: #4a6572; /* Color de fondo */
  color: #ffffff; /* Color de texto */
  box-sizing: border-box; /* Para que el padding no afecte el tamaño */
}

.article-card {
  background-color: white; /* Fondo blanco */
  border-radius: 10px; /* Bordes redondeados */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Sombra */
  text-align: center; /* Centrado */
  padding: 30px; /* Espaciado interno */
  width: 100%; /* Ocupar todo el ancho disponible */
  max-width: 1000px; /* Ancho máximo */
  margin-bottom: 30px; /* Espacio inferior */
}

.article-title {
  font-size: 1.5em; /* Tamaño del título */
  margin-bottom: 10px; /* Espaciado debajo del título */
  color: #121010; /* Color del título */
}

.article-content {
  font-size: 1em; /* Tamaño del contenido */
  color: #666666; /* Color del contenido */
  line-height: 1.6; /* Espaciado entre líneas */
}

.error-message {
  color: #ff4c4c; /* Color rojo para mensajes de error */
  font-weight: bold;
}

.pagination-controls {
  margin-top: 20px;
}

.pagination-controls button {
  background-color: #007BFF; /* Color de fondo del botón */
  color: white; /* Color del texto del botón */
  border: none; /* Sin borde */
  padding: 10px 20px; /* Espaciado interno */
  border-radius: 5px; /* Bordes redondeados */
  cursor: pointer; /* Cursor apuntador */
  margin-right: 10px;
}

.pagination-controls button:disabled {
  background-color: #cccccc; /* Color de fondo del botón deshabilitado */
  cursor: not-allowed; /* Cursor no disponible */
}
</style>
