<template>
  <div class="categories-container">
    <h1>Categorías</h1>
    <div class="categories-list">
      <div v-for="category in categories" :key="category.categoria_id" class="category-card">
        <img :src="category.imagen_url" alt="Imagen de categoría" class="category-image" />
        <h3 class="category-title">{{ category.nombre }}</h3>
        <p class="category-description">{{ category.descripcion }}</p>
      </div>
    </div>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script>
import { obtenerCategorias } from '@/services/axiosService';

// Importar las imágenes necesarias para las categorías
import tecnologiaImage from '@/assets/imagenes/tecnologia.jpg';
import cienciaImage from '@/assets/imagenes/ciencia.jpg';
import culturaImage from '@/assets/imagenes/cultura.jpg';
import deportesImage from '@/assets/imagenes/deportes.jpg';
import entretenimientoImage from '@/assets/imagenes/entretenimiento.jpg';

export default {
  name: 'CategoriesComponent',
  data() {
    return {
      categories: [],
      errorMessage: '',
    };
  },
  mounted() {
    this.fetchCategories();
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await obtenerCategorias();
        const categoriesData = response.data;

        // Asignar las imágenes correctas a cada categoría
        const imagesMap = {
          'Tecnología': tecnologiaImage,
          'Ciencia': cienciaImage,
          'Cultura': culturaImage,
          'Deportes': deportesImage,
          'Entretenimiento': entretenimientoImage,
        };

        // Ajustar las categorías para que utilicen las rutas de imagen importadas
        this.categories = categoriesData.map(category => ({
          ...category,
          imagen_url: imagesMap[category.nombre] || '', // Asignar la imagen correcta o vacío si no se encuentra
        }));

        if (this.categories.length === 0) {
          this.errorMessage = 'No se encontraron categorías';
        } else {
          this.errorMessage = ''; // Limpiar el mensaje de error si hay datos
        }
      } catch (error) {
        console.error('Error al obtener categorías:', error);
        this.errorMessage = 'Error al obtener categorías. Inténtalo de nuevo más tarde.';
      }
    },
  },
};
</script>




<style scoped>
.categories-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 80px); /* Altura de la ventana menos la cabecera, si existe */
  background-color: #4a6572;
  padding: 20px;
  border-radius: 10px;
  box-sizing: border-box;
  color: #ffffff;
}

.categories-list {
  display: flex;
  flex-wrap: wrap; /* Para permitir varias tarjetas en la misma línea */
  gap: 20px; /* Espacio entre tarjetas */
}

.category-card {
  background-color: white; /* Fondo blanco para contraste */
  border-radius: 10px; /* Bordes redondeados */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Sombra para efecto 3D */
  text-align: center; /* Centrar el contenido */
  padding: 20px; /* Espaciado interno */
  width: 200px; /* Ancho fijo para la tarjeta */
  min-height: 300px; /* Aumentar la altura mínima para tarjetas más grandes */
  display: flex; /* Usar flexbox para alinear elementos internos */
  flex-direction: column; /* Para mantener el contenido vertical */
  justify-content: space-between; /* Espacio entre elementos internos */
}

.category-image {
  width: 100%; /* Imagen a lo largo del ancho de la tarjeta */
  height: auto;
  border-radius: 10px; /* Bordes redondeados */
}

.category-title {
  margin: 10px 0; /* Espaciado entre la imagen y el título */
  color: #121010; /* Color de texto para la descripción */
  font-size: 1.2em; /* Tamaño del título */
}

.category-description {
  color: #666666; /* Color de texto para la descripción */
  font-size: 0.9em; /* Tamaño de fuente más pequeño para la descripción */
  flex-grow: 1; /* Permite que la descripción crezca para llenar el espacio */
}

.error-message {
  color: #ff4c4c; /* Color rojo para mensajes de error */
  font-weight: bold;
}
</style>
