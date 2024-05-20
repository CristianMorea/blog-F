import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Importa el enrutador desde tu archivo de rutas

// Crea la instancia de Vue
const app = createApp(App);

// Usa el enrutador importado
app.use(router);

// Monta la aplicación en el elemento con el ID '#app'
app.mount('#app');
