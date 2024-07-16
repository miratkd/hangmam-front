<template>
  <div class="timer-container">
    <div id="timerbar" class="timer-bar"></div>
  </div>
</template>

<script>
export default {
  name: 'TimerComponent',
  props: {
    timeLeft: {
      type: Number
    },
    timeoutMatch: {
      type: Function
    }
  },
  data () {
    return {
      key: ''
    }
  },
  mounted () {
    this.runProgressBarr()
  },
  methods: {
    delay (ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    },
    async runProgressBarr () {
      let progress = this.timeLeft
      while (progress >= 0 && document.getElementById('timerbar')) {
        document.getElementById('timerbar').style.width = progress / 6 + '%'
        progress -= 1
        await this.delay(1000)
      }
      document.getElementById('timerbar') && this.timeoutMatch()
    }
  }
}
</script>

<style scoped>
.timer-container{
  background-color: white;
  padding: 0.5vh 1vw;
  border-radius: 8px;
  width: 15vw;
  margin-right: 5%;
}
.timer-bar{
  background-color: blue;
  height: 1vh;
  border-radius: 8px;
  width: 0%;
  transition: width 1s;
}

/* Tablet */
@media screen and (max-width: 1050px ) and (orientation: Portrait), (max-width: 700) {
  .timer-container{
    width: 95%;
  }
}
</style>
