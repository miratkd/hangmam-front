<template>
  <div class="keyboard-container">
    <ButtonComponent class="keyboard-button" :white="true"
    :class="{'disabled-button': letterList.includes(letter.toLocaleLowerCase())}"
    @click="!letterList.includes(letter.toLocaleLowerCase()) && selectLetter(letter.toLocaleLowerCase())"
    v-for="letter in letters" :key="letter" :text="letter"/>
  </div>
</template>

<script>
import ButtonComponent from './ButtonComponent.vue'
export default {
  name: 'KeyboardComponent',
  components: {
    ButtonComponent
  },
  props: {
    selectLetter: {
      type: Function
    },
    letterList: {
      type: String
    }
  },
  data () {
    return {
      letters: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    }
  }
}
</script>

<style scoped>
.keyboard-container{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  gap: 1vh 0;
}
.keyboard-button{
  width: 65%;
  padding: 1.5vh 0;
  transition: 0.5s;
}
.disabled-button{
  background-color: darkgray;
  box-shadow: inset rgb(120, 120, 120) 0 -2px 0 3px, inset rgb(118, 118, 118) 0 2px 0 4px;
  color: rgb(67, 67, 67) !important;
  cursor: default;
}
.disabled-button:hover{
  background-color: darkgray;
  box-shadow: inset rgb(120, 120, 120) 0 -2px 0 3px, inset rgb(118, 118, 118) 0 2px 0 4px;
}
</style>
