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

/* Tablet */
@media screen and (max-width: 1050px ) and (orientation: Portrait), (max-width: 700) {
  .match-play-button{
    width: 6vw;
    height: 6vw;
  }
}

/* Mobile */
@media screen and (max-width: 500px) {
  .match-play-button{
    width: 9vw;
    height: 9vw;
  }
}
</style>
