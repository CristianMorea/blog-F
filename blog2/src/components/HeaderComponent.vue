<template>
  <header class="blog-header">
    <!-- Logo y nombre del blog -->
    <div class="header-logo">
      <router-link to="/">
        <span class="blog-name">{{ blogName }}</span>
      </router-link>
    </div>

    <!-- Barra de navegación -->
    <nav>
      <ul class="nav-list">
        <li><router-link to="/home">Inicio</router-link></li>
        <li><router-link to="/articles">Artículos</router-link></li>
        <li><router-link to="/categories">Categorías</router-link></li>
        <li><router-link to="/about">Acerca de</router-link></li>
        <li><router-link to="/contact">Contacto</router-link></li>
      </ul>
    </nav>

    <!-- Opciones del usuario -->
    <div class="header-user-options">
      <router-link to="/login">Iniciar Sesión</router-link> <!-- Apuntar a la ruta de login -->
    </div>

    <!-- Barra de búsqueda -->
    <div class="header-search">
      <form @submit.prevent="buscar">
        <input type="text" v-model="searchQuery" placeholder="Buscar..." aria-label="Buscar" />
        <button type="submit">Buscar</button>
      </form>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      blogName: "Nombre del Blog",
      searchQuery: "",
    };
  },
  methods: {
    buscar() {
      this.$router.push({ path: '/search', query: { q: this.searchQuery } });
    },
  },
};
</script>

<style scoped>
.blog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(0, 0, 0, 0.719);
  padding: 10px 20px;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
  font-family: sans-serif;
  border-radius: 10px;
}

.header-logo {
  font-size: 24px;
  color: #fff;
}

.blog-name {
  color: #fff;
}

.nav-list {
  list-style-type: none;
  display: flex;
  gap: 20px;
  margin: 0;
  padding: 0;
}

.nav-list li {
  font-size: 16px;
}

.nav-list a {
  text-decoration: none;
  color: #fff;
  transition: color 0.3s;
}

.nav-list a:hover {
  color: #03e9f4;
}

.header-user-options {
  font-size: 16px;
}

.header-user-options a {
  color: #fff;
  text-decoration: none;
  transition: color 0.3s;
}

.header-user-options a:hover {
  color: #03e9f4;
}

.header-search {
  display: flex;
  align-items: center;
}

.header-search input {
  padding: 10px;
  font-size: 16px;
  color: #fff;
  background: transparent;
  border: 1px solid #fff;
  border-radius: 5px;
  outline: none;
  transition: border-color 0.3s;
}

.header-search input:focus {
  border-color: #03e9f4;
}

.header-search button {
  padding: 10px;
  font-size: 16px;
  color: #424646;
  background: transparente;
  border: 1px solid #03e9f4;
  border-radius: 5px;
  cursor: pointer;
  transition: todo 0.3s;
  margin-left: 10px;
}

.header-search button:hover {
  background: #03e9f4;
  color: #fff;
  box-shadow: 0 0 5px #03e9f4, 0 0 25px #03e9f4;
}
</style>




































