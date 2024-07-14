<template>
  <div class="menu-modal-container" @click="close">
    <div class="menu-modal" @click.stop v-on:submit.prevent="handleButtonClick">
      <h1 class="menu-title">Menu</h1>
      <ButtonComponent class="menu-button" @click="close" text="Continuar"/>
      <ButtonComponent class="menu-button" @click="$router.push('/categories')" text="Nova categoria"/>
      <ButtonComponent class="menu-button" @click="$router.push('/')" :pink="true" text="Menu"/>
    </div>
  </div>
</template>

<script>
import ButtonComponent from './ButtonComponent.vue'
export default {
  name: 'MatchMenuComponent',
  components: {
    ButtonComponent
  },
  props: {
    close: {
      type: Function
    }
  }
}
</script>

<style scoped>
.menu-modal-container {
  position: fixed;
  height: 100vh;
  width: 100vw;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.632);
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.menu-modal {
  background-image: linear-gradient(to bottom, #344ABA, #001479bd);
  box-shadow: inset #140E66 -2px -8px 0 4px, inset #2463FF 2px 8px 0 4px;
  width: 40vw;
  height: 40vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 72px;
  padding-bottom: 5vh;
}
.menu-title {
  color: transparent;
  background-image: linear-gradient(to bottom, #67B6FF, #FFFFFF);
  background-clip: text;
  margin: 0;
  margin-top: -8vh;
  margin-bottom: 4vh;
}
.menu-button{
  margin-top: 3vh;
}
</style>
