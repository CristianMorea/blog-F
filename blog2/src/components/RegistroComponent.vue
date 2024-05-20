<template>
  <div class="register">
    <h2 style="margin-bottom: 20px;">Registro de Usuario</h2>
    <form @submit.prevent="registerUser" class="register-form">
      <div class="user-box">
        <input type="text" id="nombre" v-model="nombre" required>
        <label for="nombre">Nombre</label>
      </div>
      <div class="user-box">
        <input type="email" id="email" v-model="email" required>
        <label for="email">Correo Electrónico</label>
      </div>
      <div class="user-box">
        <input type="password" id="contrasena" v-model="contrasena" required>
        <label for="contrasena">Contraseña</label>
      </div>
      <!-- Campo oculto para rol_id -->
      <input type="hidden" id="rol_id" v-model="rol_id" value="1"> <!-- Valor por defecto para rol_id -->
      
      <button type="submit">Registrar</button>
      <!-- Mostrar mensaje de registro exitoso -->
      <p v-if="registroExitoso" class="success-message">Registro exitoso</p>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'RegistroComponent',
  data() {
    return {
      nombre: '',
      email: '',
      contrasena: '',
      rol_id: 1, // Valor por defecto para rol_id
      registroExitoso: false // Variable para controlar la visibilidad del mensaje de registro exitoso
    };
  },
  methods: {
    registerUser() {
      // Enviar datos de registro al backend
      axios.post('http://localhost:3000/register', {
        nombre: this.nombre,
        email: this.email,
        contraseña: this.contrasena // Asegúrate de que coincide con el nombre del campo en el backend
      })
      .then(response => {
        // Manejar la respuesta del servidor
        console.log(response.data); // Muestra la respuesta del servidor en la consola
        // Marcar registro como exitoso
        this.registroExitoso = true;
        // Limpiar campos después de un registro exitoso
        this.limpiarCampos();
        // Redirigir al usuario al formulario de inicio de sesión
        this.$router.push({ name: 'Login' });
      })
      .catch(error => {
        // Manejar errores de solicitud
        console.error('Error al registrar usuario:', error.response); // Mostrar respuesta detallada del error
        let errorMessage = 'Hubo un error al registrar el usuario.';

        if (error.response && error.response.data && error.response.data.message) {
          errorMessage += ' ' + error.response.data.message;
        } else {
          errorMessage += ' Por favor, inténtalo de nuevo más tarde.';
        }

        // Mostrar un mensaje de error al usuario
        alert(errorMessage);
        // Limpiar campos después de un registro fallido
        this.limpiarCampos();
      });
    },
    limpiarCampos() {
      // Limpiar campos después de un registro exitoso o fallido
      this.nombre = '';
      this.email = '';
      this.contrasena = '';
    }
  }
};
</script>


<style scoped>
.register {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  padding: 40px;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.719);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  font-family: sans-serif;
}

.register h2 {
  margin: 0;
  padding: 0;
  color: #fff;
  text-align: center;
}

.register-form {
  display: flex;
  flex-direction: column;
}

.user-box {
  position: relative;
  margin-bottom: 15px;
}

.user-box input {
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  border: none;
  border-bottom: 1px solid #fff;
  outline: none;
  background: transparent;
  caret-color: #03e9f4; /* Color del cursor */
}

.user-box label {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  pointer-events: none;
  transition: .5s;
}

.user-box input:focus ~ label,
.user-box input:not(:placeholder-shown) ~ label {
  top: -20px;
  left: 0;
  color: #03e9f4;
  font-size: 12px;
}

button[type="submit"] {
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  color: #03e9f4;
  font-size: 16px;
  text-decoration: none;
  text-transform: uppercase;
  overflow: hidden;
  transition: .5s;
  margin-top: 40px;
  letter-spacing: 4px;
  background: transparent;
  border: none;
  cursor: pointer;
}

button[type="submit"]:hover {
  background: #03e9f4;
  color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 5px #03e9f4,
              0 0 25px #03e9f4,
              0 0 50px #03e9f4,
              0 0 100px #03e9f4;
}

button[type="submit"] span {
  position: absolute;
  display: block;
}

button[type="submit"] span:nth-child(1) {
  top: 0;
  left: -100%;
  height: 2px;
  width: 100%;
  background: linear-gradient(90deg, transparent, #03e9f4);
  animation: btn-anim1 1s linear infinite;
}

@keyframes btn-anim1 {
  0% {
    left: -100%;
  }
  50%,
  100% {
    left: 100%;
  }
}

button[type="submit"] span:nth-child(2) {
  top: -100%;
  right: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(180deg, transparent, #03e9f4);
  animation: btn-anim2 1s linear infinite;
  animation-delay: .25s;
}

@keyframes btn-anim2 {
  0% {
    top: -100%;
  }
  50%,
  100% {
    top: 100%;
  }
}

button[type="submit"] span:nth-child(3) {
  bottom: 0;
  right: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(270deg, transparent, #03e9f4);
  animation: btn-anim3 1s linear infinite;
  animation-delay: .5s;
}

@keyframes btn-anim3 {
  0% {
    right: -100%;
  }
  50%,
  100% {
    right: 100%;
  }
}

button[type="submit"] span:nth-child(4) {
  bottom: -100%;
  left: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(360deg, transparent, #03e9f4);
  animation: btn-anim4 1s linear infinite;
  animation-delay: .75s;
}

@keyframes btn-anim4 {
  0% {
    bottom: -100%;
  }
  50%,
  100% {
    bottom: 100%;
  }
}
</style>
