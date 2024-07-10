<template>
  <div class="timeout-modal-container">
    <div id="timeout-modal" class="timeout-modal">
      <h2 class="WHITE">Desculpe, o tempo acabou...</h2>
      <h3 class="WHITE">A resposta era: "{{ answer }}".</h3>
      <ButtonComponent text="Voltar" @click="back"/>
    </div>
  </div>
</template>

<script>
import ButtonComponent from './ButtonComponent.vue'
export default {
  name: 'TimeoutComponent',
  props: {
    answer: {
      type: String
    },
    back: {
      type: Function
    }
  },
  mounted () {
    setTimeout(() => {
      document.getElementById('timeout-modal').style.bottom = '25vh'
    }, 500)
  },
  components: {
    ButtonComponent
  }
}
</script>

<style scoped>
.timeout-modal-container {
  position: fixed;
  height: 100vh;
  width: 100vw;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.632);
  top: 0;
  left: 0;
}

.timeout-modal {
  background-image: linear-gradient(to bottom, #344ABA, #001479bd);
  box-shadow: inset #140E66 -2px -8px 0 4px, inset #2463FF 2px 8px 0 4px;
  left: 20vw;
  width: 60vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 72px;
  padding-bottom: 5vh;
  position: fixed;
  bottom: 100vh;
  transition: 0.5s;
}
h2{
  margin: 1.5vh 0;
}
h3{
  margin: 4vh 0;
}
</style>
