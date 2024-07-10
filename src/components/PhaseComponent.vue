<template>
  <div class="phase-container">
    <div class="word-container" v-for="(word, idx) in words" :key="idx">
      <ButtonComponent class="letter-button" :class="{ 'hidden-button': !letter }" v-for="(letter, idx) in word"
        :key="idx" :text="letter" />
    </div>
  </div>
</template>

<script>
import ButtonComponent from './ButtonComponent.vue'
export default {
  name: 'PhaseComponent',
  props: {
    phaseList: {
      type: Array
    }
  },
  components: {
    ButtonComponent
  },
  computed: {
    words () {
      let word = []
      const resp = []
      for (let index = 0; index < this.phaseList.length; index++) {
        if (this.phaseList[index] === ' ') {
          resp.push(word)
          resp.push(['_'])
          word = []
        } else word.push(this.phaseList[index])
      }
      resp.push(word)
      return resp
    }
  }
}
</script>

<style scoped>
.phase-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2vh 4vw;
}

.word-container {
  display: flex;
  gap: 1vw;
}

.letter-button {
  width: 6vw;
  padding: 1.5vh 0;
  cursor: default;
  transition: 1s;
  height: 6vw;
  box-shadow: inset #243041 0 -2px 0 3px, inset #9D2DF5 0 1px 0 6px;
}

.hidden-button {
  background-color: #2462ff6d;
  box-shadow: inset #25206b 0 -2px 0 3px, inset #6c95fa 0 2px 0 4px;
}
</style>
