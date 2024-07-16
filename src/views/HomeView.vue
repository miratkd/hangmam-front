<template>
  <div class="home">
    <img src="@/assets/icon.svg" class="home-icon" alt="">
    <IconButton class="home-play-button" :img="require('@/assets/play.png')" @click="handlePlay" />
    <div class="home-buttons-container" v-if="token">
      <ButtonComponent text="Regras" class="home-button" @click="$router.push('rules')" />
      <ButtonComponent text="Continuar" class="home-button" @click="() => showActiveMatches = true" />
      <ButtonComponent text="Meu Perfil" class="home-button" @click="() => showMyAccount = true" />
      <ButtonComponent text="Sair" :pink="true" class="home-button" @click="cleanToken" />
    </div>
    <div class="home-buttons-container" v-else>
      <ButtonComponent text="Regras" class="home-button" @click="$router.push('rules')" />
      <ButtonComponent text="Login" class="home-button" @click="login" />
    </div>
    <LogInModal v-if="showLogin" :push="push" :close="closeLogin" />
    <MyAccountComponent v-if="showMyAccount" :close="close" :cleanToken="cleanToken"/>
    <ActiveMatches v-if="showActiveMatches" :close="close" :cleanToken="cleanToken"/>
  </div>
</template>

<script>
import IconButton from '../components/IconButton.vue'
import ButtonComponent from '../components/ButtonComponent.vue'
import LogInModal from '../components/LogInModal.vue'
import RequestService from '@/services/RequestService'
import NotificationService from '@/services/NotificationService'
import MyAccountComponent from '@/components/MyAccountComponent.vue'
import ActiveMatches from '@/components/ActiveMatches.vue'
export default {
  name: 'HomeView',
  components: {
    IconButton,
    ButtonComponent,
    LogInModal,
    MyAccountComponent,
    ActiveMatches
  },
  data () {
    return {
      showLogin: false,
      requestService: new RequestService(),
      token: localStorage.getItem('token'),
      push: undefined,
      showMyAccount: false,
      showActiveMatches: false
    }
  },
  mounted () {
    if (this.$route.query.login) {
      this.push = 'categories'
      this.showLogin = true
      new NotificationService().send('Desculpe, sua seção inspirou')
    }
  },
  methods: {
    handlePlay () {
      if (!this.token) {
        this.push = 'categories'
        this.showLogin = true
      } else this.$router.push('categories')
    },
    login () {
      this.showLogin = true
    },
    cleanToken () {
      localStorage.removeItem('token')
      this.token = null
    },
    close () {
      this.showActiveMatches = false
      this.showMyAccount = false
    },
    closeLogin () {
      this.showLogin = false
      this.token = localStorage.getItem('token')
    }
  }
}
</script>

<style scoped>
.home {
  background-image: linear-gradient(to bottom, #344ABA, #001479bd);
  box-shadow: inset #140E66 -2px -8px 0 4px, inset #2463FF 2px 8px 0 4px;
  margin: 0 auto;
  margin-top: 25vh;
  width: 40vw;
  height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 72px;
}

.home-icon {
  width: 30vh;
  margin-top: -7vh;
}

.home-play-button {
  width: 17vh;
  height: 17vh;
  margin-top: 5vh;
}

.home-button {
  width: 15vw;
}

.home-buttons-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5vh 2vw;
  margin-top: 3vh;
}

@media screen and (max-width: 1050px ) and (orientation: Portrait), (max-width: 700) {
  .home{
    width: 80vw;
  }
  .home-button {
    width: 25vw;
  }
}

@media screen and (max-width: 500px) {
  .home{
    width: 90vw;
    height: 55vh;
    margin-top: 17vh;
  }
  .home-button {
    width: 40vw;
  }
}
</style>
