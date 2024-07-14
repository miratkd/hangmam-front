<template>
  <div class="account-match-container">
    <span class="WHITE match-category" :title="match.category">{{ match.category }}</span>
    <span class="WHITE match-letters">{{ match.letters_right }} Acertos</span>
    <img v-if="match.isWin" title="Você ganhou!" src="@/assets/star.svg" alt="">
    <img v-else src="@/assets/lose.svg" alt="">
  </div>
</template>

<script>
export default {
  name: 'MyAccountMatch',
  props: {
    match: {
      type: Object
    }
  }
}
</script>

<style scoped>
.account-match-container{
  display: flex;
  align-items: center;
  background-color: #261676;
  border-radius: 8px;
  width: 88%;
  padding: 2% 5%;
  margin-bottom: 4%
}
.match-category{
  width: 50%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.match-letters{
  flex: 1;
}
</style>
