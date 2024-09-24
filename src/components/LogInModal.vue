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
import NotificationService from '../services/NotificationService'
import LoadingComponent from '../components/LoadingComponent'
import RequestService from '@/services/RequestService'
export default {
  name: 'LogInModal',
  props: ['close', 'push'],
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
      requestService: new RequestService(),
      emailAlert: false,
      userAlert: false,
      passwordAlerts: false,
      isLoading: false
    }
  },
  watch: {
    showCreate () {
      this.emailAlert = false
      this.userAlert = false
      this.passwordAlerts = false
      this.password = ''
    }
  },
  methods: {
    login () {
      if (this.loginFormIsNotValid()) return
      this.isLoading = true
      this.requestService.login({ email: this.email, password: this.password }).then(resp => {
        localStorage.setItem('token', resp.data.token)
        if (this.push) this.$router.push(this.push)
        else this.close()
      }).catch(error => {
        if (this.requestService.isTokenExpired(error)) return
        if (error.response.status === 403) {
          this.notification.send('Email ou senha incorretos')
          this.emailAlert = true
          this.passwordAlerts = true
        } else this.requestService.genericErrorMessage()
        this.isLoading = false
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
        return true
      }
      if (!this.password) {
        this.notification.send('Por favor, preencha o campo senha corretamente')
        this.passwordAlerts = true
        return true
      }
    },
    createFormIsNotValid () {
      if (!this.email || !this.emailIsValid(this.email)) {
        this.notification.send('Por favor, preencha o campo email corretamente')
        this.emailAlert = true
      } else this.emailAlert = false
      if (!this.user) {
        this.notification.send('Por favor, preencha o campo usuário')
        this.userAlert = true
      } else this.userAlert = false
      if (!this.password || !this.confirmPassword || this.password !== this.confirmPassword) {
        this.notification.send('Por favor, preencha os campos de senha corretamente')
        this.passwordAlerts = true
      } else this.passwordAlerts = false
      return this.emailAlert || this.userAlert || this.passwordAlerts
    },
    handleButtonClick () {
      if (this.showCreate) {
        if (this.createFormIsNotValid()) return
        this.isLoading = true
        this.requestService.createAccount({
          email: this.email,
          password: this.password,
          name: this.user
        }).then(() => this.login()).catch(error => {
          this.isLoading = false
          if (error.response.data.message === 'The email has already been taken.') this.notification.send('Desculpe, esse email ja esta em uso')
          else this.requestService.genericErrorMessage()
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

/* Tablet */
@media screen and (max-width: 1050px ) and (orientation: Portrait), (max-width: 700) {
  .login-modal{
    width: 75vw;
    height: 65vh;
  }
}

/* Mobile */
@media screen and (max-width: 500px) {
  .login-modal{
    width: 85vw;
    height: 60vh;
    margin-top: -10vh;
  }
}
</style>
