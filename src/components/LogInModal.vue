<template>
  <div class="login-modal-container" @click="close">
    <form class="login-modal" @click.stop v-on:submit.prevent="handleButtonClick">
      <h3 class="WHITE">
        {{ showCreate ? 'Crie a sua ' : 'Entre com a sua ' }}
        conta.
      </h3>
      <span class="WHITE">Email</span>
      <input type="text" v-model="email" class="login-input DARK-NAVY">
      <span v-if="showCreate" class="WHITE">Usuário</span>
      <input v-if="showCreate" type="text" v-model="user" class="login-input DARK-NAVY">
      <span class="WHITE">Senha</span>
      <input type="password" v-model="password" class="login-input DARK-NAVY">
      <span v-if="showCreate" class="WHITE">Confirmar senha</span>
      <input v-if="showCreate" type="password" class="login-input DARK-NAVY">
      <ButtonComponent class="login-button" :text="showCreate ? 'Criar conta' : 'Entrar'"/>
      <h4 class="WHITE login-create-text" v-if="!showCreate" @click="showCreate = true">Ainda não possui uma conta? crie
        uma conta agora!</h4>
    </form>
  </div>
</template>

<script>
import ButtonComponent from './ButtonComponent.vue'
import axios from 'axios'

export default {
  name: 'LogInModal',
  props: ['close'],
  components: {
    ButtonComponent
  },
  data () {
    return {
      showCreate: false,
      email: '',
      user: '',
      password: ''
    }
  },
  methods: {
    handleButtonClick () {
      if (this.showCreate) {
        axios.post('https://hangman-production-0cde.up.railway.app/api/users', {
          email: this.email,
          password: this.password,
          name: this.user
        })
      } else {
        axios.post('https://hangman-production-0cde.up.railway.app/api/login', {
          email: this.email,
          password: this.password
        })
      }
    }
  }
}
</script>

<style scoped>
.login-modal-container {
  position: fixed;
  height: 100vh;
  width: 100vw;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.632);
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-modal {
  background-image: linear-gradient(to bottom, #344ABA, #001479bd);
  box-shadow: inset #140E66 -2px -8px 0 4px, inset #2463FF 2px 8px 0 4px;
  width: 30vw;
  height: 75vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 72px;
  padding-bottom: 5vh;
}

.login-input {
  width: 70%;
  padding: 1vh 1vw;
  border-radius: 8px;
  margin: 1vh 0 2vh 0;
  font-family: "Mouse Memoirs", sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 1.8em;
}

.login-input:focus {
  outline: none;
}

.login-create-text {
  padding: 0 10%;
  text-align: center;
  cursor: pointer;
  margin-top: 1vh;
  margin-bottom: 0;
}

.login-create-text:hover {
  text-decoration: underline;
}
.login-button{
  margin-top: auto;
  width: 50%;
}
@media screen and (min-width: 1700px) {
  h3{
    margin: 4.5vh;
  }
}
</style>
