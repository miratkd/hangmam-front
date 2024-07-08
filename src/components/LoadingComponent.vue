<template>
  <div class="loading-container">
    <img src="@/assets/icon.svg" class="loading-icon" alt="">
  </div>
</template>

<script>
export default {
  name: 'LoadingComponent'
}
</script>

<style scoped>
.loading-container{
  position: fixed;
  height: 100vh;
  width: 100vw;
  z-index: 5;
  background-color: rgba(0, 0, 0, 0.632);
  top: 0;
}
.loading-icon{
  position: absolute;
  right: 10%;
  bottom: 20%;
  animation-name: pulse;
  animation-duration: 3s;
  animation-iteration-count: infinite;
  width: 15%;
}

@keyframes pulse {
  0% {width: 15%}
  50% {width: 10%}
  100% {width: 15%}
}
</style>
