<template>
  <div class="home-container">
    <!-- Video de fondo -->
    <video autoplay loop muted playsinline class="background-video">
      <source src="@/assets/v1.mp4" type="video/mp4" />
    </video>

    <!-- Contenido del componente -->
    <div class="content">
      <h1>Bienvenido a "Un Poco de Todo"</h1> <!-- Título principal del blog -->
      <h3>Explorando el mundo, un tema a la vez</h3> <!-- Subtítulo o lema -->
      <p>
        En "Un Poco de Todo", encontrarás una colección de artículos sobre una amplia variedad de temas que te interesarán.
      </p>
      <p>
        Desde tecnología y ciencia hasta arte, cultura, viajes y más, nuestro objetivo es ofrecerte contenido entretenido, informativo y, sobre todo, diverso.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeComponent', // Nombre del componente
};
</script>

<style scoped>
.home-container {
  display: flex; /* Usa flexbox para centrar el contenido */
  justify-content: center; /* Centra horizontalmente */
  align-items: center; /* Centra verticalmente */
  position: relative; /* Para posicionar el video detrás del contenido */
  height: calc(100vh - 80px); /* Altura total menos espacio para encabezado y pie de página */
  overflow: hidden; /* Evita que el contenido se desborde */
  padding: 20px; /* Espacio interno */
  box-sizing: border-box; /* Asegura que el padding no afecte el tamaño */
}

.background-video {
  position: absolute; /* Posiciona el video detrás del contenido */
  top: 0;
  left: 0;
  width: 100%; /* El video cubre todo el ancho */
  height: 100%; /* El video cubre toda la altura */
  object-fit: cover; /* Ajusta el video para que cubra el área */
  z-index: -1; /* El video está detrás del contenido */
}

.content {
  position: relative; /* Para que el contenido esté encima del video */
  z-index: 1; /* El contenido debe ser visible por encima del video */
  color: #ffffff; /* Para asegurar la legibilidad del texto */
  text-align: center; /* Centra horizontalmente el texto */
  padding: 20px; /* Espacio interno */
  max-width: 600px; /* Limita el ancho del contenido para mejorar la legibilidad */
}
</style>
