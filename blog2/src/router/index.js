// router.js
import { createRouter, createWebHistory } from 'vue-router';
import HomeComponent from '@/components/HomeComponent.vue';
import ArticlesComponent from '@/components/ArticlesComponent.vue';
import CategoriesComponent from '@/components/CategoriesComponent.vue';
import AboutComponent from '@/components/AboutComponent.vue';
import ContactComponent from '@/components/ContactComponent.vue';
import LoginComponent from '@/components/LoginComponent.vue';
import RegistroComponent from '@/components/RegistroComponent.vue'; // Componente de registro

const routes = [
  {
    path: '/', // Ruta por defecto
    name: 'Home',
    component: HomeComponent,
  },
  {
    path: '/articles',
    name: 'Articles',
    component: ArticlesComponent,
  },
  {
    path: '/categories',
    name: 'Categories',
    component: CategoriesComponent,
  },
  {
    path: '/about',
    name: 'About',
    component: AboutComponent,
  },
  {
    path: '/contact',
    name: 'Contact',
    component: ContactComponent,
  },
  {
    path: '/login', // Ruta para inicio de sesión
    name: 'Login',
    component: LoginComponent,
  },
  {
    path: '/register', // Ruta para registro de usuarios
    name: 'Register',
    component: RegistroComponent,
  },
  {
    path: '/:catchAll(.*)', // Ruta de captura para caminos desconocidos
    redirect: '/', // Redirige a la página principal
  },
];

const router = createRouter({
  history: createWebHistory(), // Usa el historial web
  routes,
});

export default router;
