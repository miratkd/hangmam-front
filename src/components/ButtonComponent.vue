<template>
  <button class="button-container WHITE">{{ text }}</button>
</template>

<script>
export default {
  name: 'ButtonComponent',
  props: ['text']
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
  margin-top: 5vh;
  padding: 0.5vh 0;
  box-shadow: inset #140E66 0 -2px 0 3px, inset #3C74FF 0 2px 0 4px;
  cursor: pointer;
  transition: 0.1s;
}
.button-container:hover{
  background-color: #5885f6;
  box-shadow: inset #25206b 0 -2px 0 3px, inset #6c95fa 0 2px 0 4px;
}
</style>
