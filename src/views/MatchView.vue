<template>
  <div  class="categories-page">
    <TimeoutComponent v-if="showTimeoutModal" :answer="answer" :back="() => $router.push('/categories')"/>
    <LoadingComponent v-if="isLoading"/>
    <div v-else class="categories-title-container">
      <IconButton :img="require('@/assets/back.png')" class="categories-back-button" @click="$router.push('/categories')"/>
      <h2 class="categories-title">{{ match.category }}</h2>
      <TimerComponent :timeLeft="match.time_left" :timeoutMatch="timeoutMatch"/>
      <LivesComponent :lives="match.lives" />
    </div>
  </div>
</template>

<script>
import IconButton from '@/components/IconButton.vue'
import TimerComponent from '../components/TimerComponent.vue'
import LoadingComponent from '../components/LoadingComponent.vue'
import axios from 'axios'
import LivesComponent from '../components/LivesComponent.vue'
import TimeoutComponent from '../components/TimeoutComponent.vue'
export default {
  name: 'MatchView',
  components: {
    IconButton,
    TimerComponent,
    LoadingComponent,
    LivesComponent,
    TimeoutComponent
  },
  created () {
    this.loadPage()
  },
  data () {
    return {
      isLoading: true,
      config: { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } },
      match: {},
      showTimeoutModal: false,
      answer: ''
    }
  },
  methods: {
    loadPage () {
      axios.get('https://hangman-production-0cde.up.railway.app/api/match/' + this.$route.params.id, this.config).then(resp => {
        this.match = resp.data.data
        if (this.match.time_left < 0) {
          this.timeoutMatch()
          return
        }
        this.match.lives = 6 - (this.match.letters_list.split('').length - this.match.letters_right)
        this.isLoading = false
      })
    },
    timeoutMatch () {
      axios.put('https://hangman-production-0cde.up.railway.app/api/match/' + this.$route.params.id, { letter: '1' }, this.config).then(resp => {
        this.answer = resp.data.data.word
        this.showTimeoutModal = true
        this.isLoading = false
      })
    }
  }
}
</script>

<style scoped>
.categories-page {
  margin: 0 7vw;
  margin-top: 10vh;
}
.categories-title-container {
  display: flex;
  align-items: center;
  position: relative;
}

.categories-title {
  color: transparent;
  background-image: linear-gradient(to bottom, #67B6FF, #FFFFFF);
  background-clip: text;
  margin: 0;
  flex: 1;
  margin-left: 5%;
}

.categories-back-button {
  width: 5vw;
  height: 5vw;
}
</style>
