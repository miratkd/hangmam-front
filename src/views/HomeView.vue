<template>
  <div class="home">
    <img src="@/assets/icon.svg" class="home-icon" alt="">
    <IconButton class="home-play-button" :img="require('@/assets/play.png')" @click="handlePlay"/>
    <ButtonComponent text="REGRAS" class="home-button" @click="$router.push('rules')"/>

    <LogInModal v-if="showLogin" :close="() => showLogin = false"/>
  </div>
</template>

<script>
import IconButton from '../components/IconButton.vue'
import ButtonComponent from '../components/ButtonComponent.vue'
import LogInModal from '../components/LogInModal.vue'

export default {
  name: 'HomeView',
  components: { IconButton, ButtonComponent, LogInModal },
  data () {
    return {
      showLogin: false
    }
  },
  methods: {
    handlePlay () {
      if (!localStorage.getItem('token')) this.showLogin = true
      else this.$router.push('categories')
    }
  }
}
</script>

<style scoped>
.home{
  background-image: linear-gradient(to bottom, #344ABA , #001479bd);
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
.home-icon{
  width: 30vh;
  margin-top: -7vh;
}
.home-play-button{
  width: 17vh;
  height: 17vh;
  margin-top: 5vh;
}
.home-button{
  margin-top: 5vh;
}
</style>
