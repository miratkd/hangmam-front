<template>
  <div class="phase-container">
    <div class="word-container" v-for="(word, idx) in words" :key="idx">
      <ButtonComponent class="letter-button" :class="{ 'hidden-button': !letter }" v-for="(letter, idx) in word" :key="idx" :text="letter"/>
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
  data () {
    return {
      words: []
    }
  },
  created () {
    let word = []
    for (let index = 0; index < this.phaseList.length; index++) {
      if (this.phaseList[index] === ' ') {
        this.words.push(word)
        this.words.push(['_'])
        word = []
      } else word.push(this.phaseList[index])
    }
    this.words.push(word)
  }
}
</script>

<style scoped>
.phase-container{
  margin-top: 5vh;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2vh 4vw;
}
.word-container{
  display: flex;
  gap: 1vw;
}
.letter-button{
  width: 6vw;
  padding: 1.5vh 0;
  cursor: default;
  transition: 1s;
}
.hidden-button{
  background-color: #2462ff6d
}
</style>
