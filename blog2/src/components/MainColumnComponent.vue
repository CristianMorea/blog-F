<template>
    <div class="main-column">
      <p>Este es el MainColumnComponent. ¡Si puedes verlo, está funcionando!</p> <!-- Frase para verificar -->
      <router-view /> <!-- Cambia el contenido según la ruta -->
    </div>
  </template>
  
  <script>
  export default {
    name: 'MainColumnComponent',
  };
  </script>
  
  <style scoped>
  .main-column {
    flex-grow: 1; /* Permite que este componente crezca para ocupar espacio */
    padding: 20px; /* Margen interno */
    background-color:  #616977; /* Color de fondo distintivo */
  }
  </style>
  