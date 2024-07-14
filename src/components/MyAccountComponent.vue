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
    </div>

    <LoadingComponent v-if="isLoading"/>
  </div>
</template>

<script>
import RequestService from '@/services/RequestService'
import LoadingComponent from './LoadingComponent.vue'
import AccountInfo from './AccountInfo.vue'
export default {
  name: 'MyAccountComponent',
  components: {
    LoadingComponent,
    AccountInfo
  },
  props: {
    close: {
      type: Function
    }
  },
  data () {
    return {
      isLoading: true,
      request: new RequestService(),
      account: {}
    }
  },
  created () {
    this.request.me().then(resp => {
      this.account = resp.data.data
      console.log(this.account)
      this.isLoading = false
    }).catch(error => {
      if (this.request.isTokenExpired(error)) return
      this.request.genericErrorMessage()
      this.close()
    })
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
  margin-top: 5vh
}
</style>
