<template>
  <div class="app-container">
    <HeaderComponent /> <!-- Encabezado -->
    <router-view /> <!-- Punto donde se muestran las rutas -->
    <FooterComponent /> <!-- Pie de página -->
  </div>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';

export default {
  name: 'App',
  components: {
    HeaderComponent,
    FooterComponent,
  },
};
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: space-between;
}
</style>
