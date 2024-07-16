<template>
  <div class="lives-container">
    <img src="@/assets/live.png" alt="" class="live-img" :class="{ 'live-black' : lives < 1 }">
    <img src="@/assets/live.png" alt="" class="live-img" :class="{ 'live-black' : lives < 2 }">
    <img src="@/assets/live.png" alt="" class="live-img" :class="{ 'live-black' : lives < 3 }">
    <img src="@/assets/live.png" alt="" class="live-img" :class="{ 'live-black' : lives < 4 }">
    <img src="@/assets/live.png" alt="" class="live-img" :class="{ 'live-black' : lives < 5 }">
    <img src="@/assets/live.png" alt="" class="live-img" :class="{ 'live-black' : lives < 6 }">
  </div>
</template>

<script>
export default {
  name: 'LivesComponent',
  props: {
    lives: {
      type: Number
    }
  }
}
</script>

<style scoped>
.lives-container{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0.5vh 1vw;
}
.live-icon{
  width: 4vw;
  transition: 1s;
}
.live-black{
  filter: grayscale(1) contrast(100) brightness(0.3);
}
.live-img{
  width: 4em;
}
@media screen and (max-width: 500px) {
  .live-img{
    width: 3em;
  }
}
</style>
