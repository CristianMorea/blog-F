<!-- FooterComponent.vue -->
<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-info">
        <p>&copy; 2024 Tu Blog Personal. Todos los derechos reservados.</p>
        <p>Contacto: contacto@tublog.com</p>
      </div>
      <div class="footer-social">
        <a href="https://twitter.com/tuusuario" target="_blank">Twitter</a>
        <a href="https://facebook.com/tuusuario" target="_blank">Facebook</a>
        <a href="https://instagram.com/tuusuario" target="_blank">Instagram</a>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterComponent',
};
</script>

<style scoped>
.footer {
  background: rgba(0, 0, 0, 0.719);
  padding: 20px;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
  font-family: sans-serif;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.footer-content {
  display: flex;
  flex-direction: column; /* Cambiar a columna para apilar elementos */
  align-items: center; /* Centrar horizontalmente */
  color: #fff;
}

.footer-info {
  text-align: center; /* Centrar texto */
  margin-bottom: 10px; /* Espacio entre secciones */
}

.footer-social {
  text-align: center; /* Centrar enlaces sociales */
}

.footer-social a {
  text-decoration: none;
  color: #fff;
  margin: 0 10px;
  transition: color 0.3s;
}

.footer-social a:hover {
  color: #03e9f4;
}

.footer-info p {
  margin: 5px 0;
  font-size: 14px;
}
</style>
