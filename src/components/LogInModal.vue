<template>
  <div class="login-modal-container" @click="close">
    <form class="login-modal" @click.stop v-on:submit.prevent="handleButtonClick">
      <h3 class="WHITE">
        {{ showCreate ? 'Crie a sua ' : 'Entre com a sua ' }}
        conta.
      </h3>
      <span class="WHITE">Email</span>
      <input type="text" v-model="email" class="login-input DARK-NAVY" v-on:focus="emailAlert = false"
        :class="{ 'input-alert': emailAlert }">
      <span v-if="showCreate" class="WHITE">Usuário</span>
      <input v-if="showCreate" type="text" v-model="user" class="login-input DARK-NAVY" v-on:focus="userAlert = false"
        :class="{ 'input-alert': userAlert }">
      <span class="WHITE">Senha</span>
      <input type="password" v-model="password" class="login-input DARK-NAVY" v-on:focus="passwordAlerts = false"
        :class="{ 'input-alert': passwordAlerts }">
      <span v-if="showCreate" class="WHITE">Confirmar senha</span>
      <input v-if="showCreate" type="password" v-model="confirmPassword" class="login-input DARK-NAVY" v-on:focus="passwordAlerts = false"
        :class="{ 'input-alert': passwordAlerts }">
      <ButtonComponent class="login-button" :text="showCreate ? 'Criar conta' : 'Entrar'" />
      <h4 class="WHITE login-create-text" v-if="!showCreate" @click="showCreate = true">Ainda não possui uma conta? crie
        uma conta agora!</h4>
    </form>

    <LoadingComponent v-if="isLoading"/>
  </div>
</template>

<script>
import ButtonComponent from './ButtonComponent.vue'
import axios from 'axios'
import NotificationService from '../services/NotificationService'
import LoadingComponent from '../components/LoadingComponent'

export default {
  name: 'LogInModal',
  props: ['close'],
  components: {
    ButtonComponent,
    LoadingComponent
  },
  data () {
    return {
      showCreate: false,
      email: '',
      user: '',
      password: '',
      confirmPassword: '',
      notification: new NotificationService(),
      emailAlert: false,
      userAlert: false,
      passwordAlerts: false,
      isLoading: false
    }
  },
  methods: {
    login () {
      if (this.loginFormIsNotValid()) return
      this.isLoading = true
      axios.post('https://hangman-production-0cde.up.railway.app/api/login', {
        email: this.email,
        password: this.password
      }).then(resp => {
        localStorage.setItem('token', resp.data.token)
        this.$router.push('categories')
      }).catch(error => {
        this.isLoading = false
        if (error.response.status === 403) {
          this.notification.send('Email ou senha incorretos')
          this.emailAlert = true
          this.passwordAlerts = true
        } else this.notification.send('Desculpe, não foi possivel fazer o login')
      })
    },
    emailIsValid (email) {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    },
    loginFormIsNotValid () {
      if (!this.email || !this.emailIsValid(this.email)) {
        this.notification.send('Por favor, preencha o campo email corretamente')
        this.emailAlert = true
      }
      if (!this.password) {
        this.notification.send('Por favor, preencha o campo senha corretamente')
        this.passwordAlerts = true
      }
      return this.emailAlert || this.passwordAlerts
    },
    createFormIsNotValid () {
      if (!this.email || !this.emailIsValid(this.email)) {
        this.notification.send('Por favor, preencha o campo email corretamente')
        this.emailAlert = true
      }
      if (!this.user) {
        this.notification.send('Por favor, preencha o campo usuário')
        this.userAlert = true
      }
      if (!this.password || !this.confirmPassword || this.password !== this.confirmPassword) {
        this.notification.send('Por favor, preencha os campos de senha corretamente')
        this.passwordAlerts = true
      }
      return this.emailAlert || this.userAlert || this.passwordAlerts
    },
    handleButtonClick () {
      if (this.showCreate) {
        if (this.createFormIsNotValid()) return
        this.isLoading = true
        axios.post('https://hangman-production-0cde.up.railway.app/api/users', {
          email: this.email,
          password: this.password,
          name: this.user
        }).then(() => this.login()).catch(error => {
          this.isLoading = false
          if (error.response.data.message === 'The email has already been taken.') this.notification.send('Desculpe, esse email ja esta em uso')
          else this.notification.send('Desculpe, não foi possível criar uma conta')
        })
      } else this.login()
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
  border: none;
  text-align: center;
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

.login-button {
  margin-top: auto;
  width: 50%;
}

.input-alert {
  outline: lightcoral 3px solid !important;
  color: lightcoral;
}

@media screen and (min-width: 1700px) {
  h3 {
    margin: 4.5vh;
  }
}
</style>
