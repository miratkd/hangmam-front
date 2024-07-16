<template>
  <div class="account-modal-container" @click="close">
    <div class="account-modal" @click.stop>
      <h2 class="account-modal-title">Meu Perfil</h2>
      <div class="account-info-container">
        <AccountInfo title="Nome" :value="account.name"/>
        <AccountInfo title="Email" :value="account.email"/>
        <AccountInfo title="Data de criação" :value="account.createdAt"/>
        <AccountInfo title="Palavras concluídas" :value="account.wordsCompleteds"/>
      </div>
      <h3 class="WHITE account-history-title">Histórico</h3>
      <div class="account-history-container" v-if="history.length > 0">
        <MyAccountMatch v-for="match in history" :key="match.id" :match="match"/>
        <ButtonComponent @click="loadMore" v-if="page < lastPage" class="account-history-button" text="Mostrar mais"/>
      </div>
      <h4 v-else class="WHITE">Desculpe, Você não tem nenhum partida, ainda...</h4>
    </div>

    <LoadingComponent v-if="isLoading"/>
  </div>
</template>

<script>
import RequestService from '@/services/RequestService'
import LoadingComponent from './LoadingComponent.vue'
import AccountInfo from './AccountInfo.vue'
import MyAccountMatch from './MyAccountMatch.vue'
import ButtonComponent from './ButtonComponent.vue'
export default {
  name: 'MyAccountComponent',
  components: {
    LoadingComponent,
    AccountInfo,
    MyAccountMatch,
    ButtonComponent
  },
  props: {
    close: {
      type: Function
    },
    cleanToken: {
      type: Function
    }
  },
  data () {
    return {
      isLoading: true,
      request: new RequestService(),
      account: {},
      history: [],
      page: 1,
      lastPage: undefined
    }
  },
  created () {
    const me = this.request.me()
    const history = this.request.history(this.page)
    Promise.all([me, history]).then(resp => {
      this.account = resp[0].data.data
      this.history = resp[1].data.data
      this.lastPage = resp[1].data.meta.last_page
      this.isLoading = false
    }).catch(error => {
      if (this.request.isTokenExpired(error)) this.cleanToken()
      else this.request.genericErrorMessage()
      this.close()
    })
  },
  methods: {
    loadMore () {
      this.page++
      this.isLoading = true
      this.request.history(this.page).then(resp => {
        this.history.push(...resp.data.data)
        this.isLoading = false
      })
    }
  }
}
</script>

<style scoped>
.account-modal-container {
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

.account-modal {
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
.account-modal-title{
  color: transparent;
  background-image: linear-gradient(to bottom, #67B6FF, #FFFFFF);
  background-clip: text;
  margin: 0;
  margin-top: -6.5vh
}
.account-info-container{
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3vh 1vw;
  margin-top: 3vh
}
.account-history-title{
  margin: 5%;
}
.account-history-container{
  flex: 1;
  width: 90%;
  overflow: auto;
}
.account-history-button{
  margin: 0 30%
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

/* Tablet */
@media screen and (max-width: 1050px ) and (orientation: Portrait), (max-width: 700) {
  .account-modal{
    width: 70vw;
  }
  .account-info-container{
    gap: 2vh 5vw;
  }
  span {
    width: 10vw;
  }
}

/* Mobile */
@media screen and (max-width: 500px) {
  .account-modal{
    width: 95vw;
    margin-top: -5vh
  }
  .account-modal-title{
    margin-top: -5vh;
  }
}
</style>
