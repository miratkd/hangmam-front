<template>
  <LoadingComponent v-if="isLoading" />
  <div v-else class="match-page">
    <TimeoutComponent v-if="showTimeoutModal" :message="showTimeoutModal" :answer="answer" :back="() => $router.push('/categories')" />
    <WinModal v-if="match.is_win" :answer="match.word.join('')" :back="() => $router.push('/categories')"/>
    <div class="match-title-container">
      <IconButton :img="require('@/assets/back.png')" class="match-back-button" @click="$router.push('/categories')" />
      <h2 class="match-title">{{ match.category }}</h2>
      <TimerComponent :timeLeft="match.time_left" :timeoutMatch="timeoutMatch" />
      <LivesComponent :lives="match.lives" />
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
import axios from 'axios'
import LivesComponent from '../components/LivesComponent.vue'
import TimeoutComponent from '../components/TimeoutComponent.vue'
import PhaseComponent from '../components/PhaseComponent.vue'
import KeyboardComponent from '../components/KeyboardComponent.vue'
import WinModal from '../components/WinModal.vue'
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
    WinModal
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
      answer: ''
    }
  },
  methods: {
    loadPage () {
      axios.get('https://hangman-production-0cde.up.railway.app/api/match/' + this.$route.params.id, this.config).then(resp => {
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
      axios.put('https://hangman-production-0cde.up.railway.app/api/match/' + this.$route.params.id, { letter: letter }, this.config).then(resp => {
        this.prepareMatch(resp.data.data)
        this.isletterLoading = false
      })
    },
    timeoutMatch () {
      axios.put('https://hangman-production-0cde.up.railway.app/api/match/' + this.$route.params.id, { letter: '1' }, this.config).then(resp => {
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

.match-back-button {
  width: 5vw;
  height: 5vw;
}

.loading-icon {
  width: 10vw;
  position: absolute;
  right: 10%;
  top: 40%;
  animation: rotate 1s infinite;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
