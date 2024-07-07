<template>
  <div class="rules-page">
    <div class="rules-title-container">
      <IconButton :img="require('@/assets/back.png')" class="rules-back-button" @click="$router.push('/')"/>
      <h1 class="rules-title">Como Jogar</h1>
    </div>
    <div class="rules-cards-container">
      <div class="rules-card">
        <h2 class="BLUE">01</h2>
        <h3 class="DARK-NAVY">Escolha uma categoria</h3>
        <span class="card-text">Primeiro, escolha uma categoria de palavras, como animais ou filmes. Em seguida, o
          computador seleciona aleatoriamente uma palavra secreta desse tópico e mostra espaços em branco para cada
          letra da palavra.</span>
      </div>
      <div class="rules-card">
        <h2 class="BLUE">02</h2>
        <h3 class="DARK-NAVY">Escolha uma letra</h3>
        <span class="card-text">Tente descobrir a palavra. O computador preenche os espaços em branco relevantes se o
          seu palpite estiver correto. Se estiver errado, você perde um pouco de saúde, que esvazia após seis palpites
          incorretos. Você também tem um limite de 10 minutos para advinhar a palavra</span>
      </div>
      <div class="rules-card">
        <h2 class="BLUE">03</h2>
        <h3 class="DARK-NAVY">Ganhe ou perca</h3>
        <span class="card-text">Você ganha adivinhando todas as letras da palavra antes que sua saúde acabe. Se a barra
          de saúde esvaziar ou o tempo acabar antes de você adivinhar a palavra, você perde.</span>
      </div>
    </div>
  </div>
</template>

<script>
import IconButton from '@/components/IconButton.vue'
export default {
  name: 'RulesView',
  components: {
    IconButton
  }
}
</script>

<style scoped>
.rules-page {
  margin: 0 7vw;
  margin-top: 10vh;
}

.rules-title-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.rules-title {
  color: transparent;
  background-image: linear-gradient(to bottom, #67B6FF, #FFFFFF);
  background-clip: text;
  margin: 0;
}

.rules-back-button {
  width: 7vw;
  height: 7vw;
  position: absolute;
  left: 0;
}

.rules-cards-container {
  display: flex;
  justify-content: space-between;
  margin-top: 5vh;
}

.rules-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 45vh;
  width: 23vw;
  background-color: #FFFFFF;
  border-radius: 40px;
  text-align: center;
  padding: 7vh 1vw;
}

h2 {
  margin: 0;
}

h3 {
  margin: 0;
}

.card-text {
  color: #887DC0;
  margin-top: auto;
}

@media screen and (min-width: 1700px) {
  .rules-page {
    margin-top: 5vh;
  }
}
</style>
