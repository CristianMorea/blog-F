<template>
  <div class="contact-container">
    <h1>Contacto</h1>
    <p>Información de contacto o formulario para ponerse en contacto.</p>
  </div>
</template>

<script>
export default {
  name: 'ContactComponent',
};
</script>

<style scoped>
.contact-container {
  display: flex;
  flex-direction: column; /* Orientación vertical */
  justify-content: center; /* Centra verticalmente */
  align-items: center; /* Centra horizontalmente */
  height: calc(100vh - 80px); /* Altura completa menos el espacio del header y footer */
  padding: 20px;
  background-color:  #4a6572; /* Color que contrasta con el encabezado y pie de página */
  color: #ffffff; /* Asegura que el texto sea legible sobre el fondo */
  box-sizing: border-box; /* Para que el padding no afecte el tamaño */
}
</style>
