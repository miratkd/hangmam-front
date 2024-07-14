<template>
  <button class="button-container WHITE" :class="{'pink-button': pink, 'white-button': white}">{{ text }}</button>
</template>

<script>
export default {
  name: 'ButtonComponent',
  props: ['text', 'pink', 'white']
}
</script>

<style scoped>
.button-container {
  background-color: #2463FF;
  border: none;
  text-align: center;
  font-family: "Mouse Memoirs", sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 2.3em;
  border-radius: 20px;
  width: 40%;
  padding: 0.5vh 0;
  box-shadow: inset #140E66 0 -2px 0 3px, inset #3C74FF 0 2px 0 4px;
  cursor: pointer;
  transition: 0.1s;
}
.button-container:hover{
  background-color: #5885f6;
  box-shadow: inset #25206b 0 -2px 0 3px, inset #6c95fa 0 2px 0 4px;
}
.pink-button{
  background-image: linear-gradient(to bottom, #FE71FE, #7199FF);
  box-shadow: inset #243041 0 -2px 0 3px, inset #9D2DF5 0 -2px 0 4px;
}
.pink-button:hover{
  background-image: linear-gradient(to bottom, #f696f6, #97b1f3);
  box-shadow: inset #313b47 0 -2px 0 3px, inset #b05df0 0 -2px 0 4px;
}
.white-button{
  background-color: white;
  color: #2463FF;
}
.white-button{
  background-color: white;
  color: #2463FF;
  box-shadow: none;
  transition: none !important;
}
.white-button:hover{
  background-color: #2463FF;
  color: white;
  box-shadow: none;
}
</style>
