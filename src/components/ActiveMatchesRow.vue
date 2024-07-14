<template>
  <div class="match-row-container" @click="send">
    <span class="DARK-NAVY">{{ match.category }}</span>
    <IconButton class="match-play-button" :img="require('@/assets/play.png')" @click="handlePlay" />
  </div>
</template>

<script>
import IconButton from './IconButton.vue'
export default {
  name: 'ActiveMatchesRow',
  components: {
    IconButton
  },
  props: {
    match: {
      type: Object
    }
  },
  methods: {
    send () {
      this.$router.push({ name: 'match', params: { id: this.match.id } })
    }
  }
}
</script>

<style scoped>
.match-row-container{
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 87%;
  background-color: white;
  border-radius: 8px;
  padding: 1vh 5%;
  margin-bottom: 3vh;
  cursor: pointer;
}
.match-play-button{
  height: 4vw;
  width: 4vw;
}
</style>
