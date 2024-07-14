<template>
  <div class="active-matches-container" @click="close">
    <div class="active-matches" @click.stop>
      <h3 class="WHITE">Partidas em andamento:</h3>
      <div class="active-matches-list-container" v-if="matches.length > 0">
        <ActiveMatchesRow v-for="match in matches" :key="match.id" :match="match"/>
      </div>
      <h4 class="WHITE" v-else>Não ha nenhuma partida disponível.</h4>
    </div>
    <LoadingComponent v-if="isLoading"/>
  </div>
</template>

<script>
import RequestService from '@/services/RequestService'
import LoadingComponent from './LoadingComponent.vue'
import ActiveMatchesRow from './ActiveMatchesRow.vue'
export default {
  name: 'ActiveMatchesComponent',
  components: {
    LoadingComponent,
    ActiveMatchesRow
  },
  props: {
    close: {
      type: Function
    }
  },
  data () {
    return {
      matches: [],
      isLoading: true
    }
  },
  created () {
    new RequestService().availableMatches().then(resp => {
      this.matches = resp.data.data
      this.isLoading = false
    })
  }
}
</script>

<style scoped>
.active-matches-container {
  position: fixed;
  height: 100vh;
  width: 100vw;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.632);
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.active-matches {
  background-image: linear-gradient(to bottom, #344ABA, #001479bd);
  box-shadow: inset #140E66 -2px -8px 0 4px, inset #2463FF 2px 8px 0 4px;
  width: 40vw;
  height: 75vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 72px;
  padding-bottom: 5vh;
}
.active-matches-list-container{
  flex: 1;
  overflow: auto;
  width: 90%;
}
::-webkit-scrollbar {
  width: 1vw;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: white;
  border-radius: 8px;
}
</style>
