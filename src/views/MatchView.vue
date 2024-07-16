<template>
  <LoadingComponent v-if="isLoading" />
  <div v-else class="match-page">
    <TimeoutComponent v-if="showTimeoutModal" :message="showTimeoutModal" :answer="answer" :back="() => $router.push('/categories')" />
    <WinModal v-if="match.is_win" :answer="match.word.join('')" :back="() => $router.push('/categories')"/>
    <MatchMenuComponent v-if="showMenu" :close="() => showMenu = false"/>
    <div class="match-title-container">
      <IconButton :img="require('@/assets/menuIcon.png')" class="mobile-menu-icon" @click="showMenu=true" />
      <h2 class="match-title">{{ match.category }}</h2>
      <div class="match-lives-container">
        <TimerComponent :timeLeft="match.time_left" :timeoutMatch="timeoutMatch" />
        <LivesComponent :lives="match.lives" />
      </div>
    </div>
    <PhaseComponent :phaseList="match.word" />
    <KeyboardComponent :selectLetter="selectLetter" :letterList="match.letters_list" />
    <img src="@/assets/loadIcon.svg" class="loading-icon" alt="" v-if="isletterLoading">
  </div>
</template>

<script>
import IconButton from '@/components/IconButton.vue'
import TimerComponent from '../components/TimerComponent.vue'
import LoadingComponent from '../components/LoadingComponent.vue'
import RequestService from '@/services/RequestService'
import LivesComponent from '../components/LivesComponent.vue'
import TimeoutComponent from '../components/TimeoutComponent.vue'
import PhaseComponent from '../components/PhaseComponent.vue'
import KeyboardComponent from '../components/KeyboardComponent.vue'
import WinModal from '../components/WinModal.vue'
import MatchMenuComponent from '../components/MatchMenuComponent.vue'
export default {
  name: 'MatchView',
  components: {
    IconButton,
    TimerComponent,
    LoadingComponent,
    LivesComponent,
    TimeoutComponent,
    PhaseComponent,
    KeyboardComponent,
    WinModal,
    MatchMenuComponent
  },
  created () {
    this.loadPage()
  },
  data () {
    return {
      isLoading: true,
      isletterLoading: false,
      config: { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } },
      match: {},
      showTimeoutModal: undefined,
      answer: '',
      showMenu: false,
      request: new RequestService(),
      id: this.$route.params.id
    }
  },
  methods: {
    loadPage () {
      this.request.loadMatch(this.id).then(resp => {
        this.prepareMatch(resp.data.data)
        this.isLoading = false
      })
    },
    prepareMatch (match) {
      if (match.isOver) {
        this.answer = match.word
        this.showTimeoutModal = 'suas tentativas acabaram'
        this.isletterLoading = false
        this.match.lives = 0
        return
      }
      this.match = match
      if (this.match.time_left < 0) {
        this.timeoutMatch()
        return
      }
      this.match.lives = 6 - (this.match.letters_list.split('').length - this.match.letters_right)
    },
    selectLetter (letter) {
      if (this.isletterLoading) return
      this.isletterLoading = true
      this.request.setLetter(this.id, letter).then(resp => {
        this.prepareMatch(resp.data.data)
        this.isletterLoading = false
      })
    },
    timeoutMatch () {
      this.request.setLetter(this.id, '1').then(resp => {
        this.answer = resp.data.data.word
        this.showTimeoutModal = 'seu tempo acabou'
        this.isLoading = false
      })
    }
  }
}
</script>

<style scoped>
.match-page {
  margin: 0 7vw;
  margin-top: 10vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 80vh;
}

.match-title-container {
  display: flex;
  align-items: center;
  position: relative;
}

.match-title {
  color: transparent;
  background-image: linear-gradient(to bottom, #67B6FF, #FFFFFF);
  background-clip: text;
  margin: 0;
  flex: 1;
  margin-left: 5%;
}

.loading-icon {
  width: 10vw;
  position: absolute;
  right: 10%;
  top: 40%;
  animation: rotate 1s infinite;
}

.match-lives-container{
  display: flex;
  align-items: center;
  gap: 2vw;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

/* Tablet */
@media screen and (max-width: 1050px ) and (orientation: Portrait), (max-width: 700) {
  .match-page{
    margin: 0 4vw;
    margin-top: 4vh;
  }
  .icon-button-container{
    width: 7vw;
    height: 7vw;
  }
  .match-lives-container{
    flex-direction: column;
  }
}

/* Mobile */
@media screen and (max-width: 500px) {
  body {
    font-size: 1.2vh;
  }
  .match-page{
    margin: 0 2vw;
    margin-top: 4vh;
  }
  .mobile-menu-icon{
    width: 10vw;
    height: 10vw;
  }
}
</style>
