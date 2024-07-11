<template>
  <div role="button" class="icon-button-container">
    <img :src="img" class="icon-button-icon" alt="">
  </div>
</template>

<script>
export default {
  name: 'IconButton',
  props: ['img']
}
</script>

<style scoped>
.icon-button-container{
  background-image: linear-gradient(to bottom, #FE71FE, #7199FF);
  box-shadow: inset #243041 0 -2px 0 5px, inset #9D2DF5 0 -5px 0 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
  transition: 0.1s;
  width: 8vh;
  height: 8vh;
}
.icon-button-container:hover{
  background-image: linear-gradient(to bottom, #f696f6, #97b1f3);
  box-shadow: inset #313b47 0 -2px 0 5px, inset #b05df0 0 -5px 0 9px;
}
.icon-button-icon{
  width: 40%;
  margin-top: -0.5vh;
}
</style>
