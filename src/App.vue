<template>
  <router-view />
</template>

<style>
body {
  background-image: url('@/assets/background.svg');
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  font-size: 1vw;
}

h1 {
  font-family: "Mouse Memoirs", sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 9.5em;
}

h2 {
  font-family: "Mouse Memoirs", sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 6em;
}

h3 {
  font-family: "Mouse Memoirs", sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 3.3em;
}

h4 {
  font-family: "Mouse Memoirs", sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 2.3em;
}

span {
  font-family: "Mouse Memoirs", sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 1.8em;
}

.DARK-NAVY {
  color: #261676;
}

.BLUE {
  color: #2463FF;
}

.WHITE {
  color: white;
}

/* Wide Screan */
@media screen and (min-width: 1700px) {
  body {
    font-size: 0.9vw;
  }
}

/* Tablet */
@media screen and (max-width: 1050px ) and (orientation: Portrait), (max-width: 700) {
  body {
    font-size: 1.75vw;
  }
  h1{
    font-size: 8em;
  }
}

/* Mobile */
@media screen and (max-width: 500px) {
  body {
    font-size: 1.2vh;
  }
}
</style>
