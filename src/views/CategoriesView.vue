<template>
  <div class="categories-page">
    <div class="categories-title-container">
      <IconButton :img="require('@/assets/back.png')" class="categories-back-button" @click="$router.push('/')" />
      <h1 class="categories-title">Categorias</h1>
    </div>
    <div class="categories-grid-container">
      <ButtonComponent @click="createMatch(category.id)" class="categories-button" v-for="category in categories"
        :key="category.id" :text="category.name + ' - ' + category.finishedWords + '/' + category.allWords" />
    </div>
    <LoadingComponent v-if="isLoading" />
  </div>
</template>

<script>
import IconButton from '@/components/IconButton.vue'
import ButtonComponent from '../components/ButtonComponent.vue'
import RequestService from '../services/RequestService'
import LoadingComponent from '../components/LoadingComponent'
export default {
  name: 'CategoriesView',
  components: {
    ButtonComponent,
    LoadingComponent,
    IconButton
  },
  data () {
    return {
      isLoading: true,
      categories: [],
      requestService: new RequestService()
    }
  },
  created () {
    this.requestService.getCategories().then(resp => {
      this.categories = resp.data.data
      this.isLoading = false
    }).catch(error => {
      if (this.requestService.isTokenExpired(error)) return
      this.requestService.genericErrorMessage()
      this.isLoading = false
    })
  },
  methods: {
    createMatch (id) {
      this.isLoading = true
      this.requestService.createMatch(id).then(resp => {
        this.$router.push({ name: 'match', params: { id: resp.data.data.id } })
      }).catch(error => {
        if (this.requestService.isTokenExpired(error)) return
        this.requestService.genericErrorMessage()
        this.isLoading = false
      })
    }
  }
}
</script>

<style scoped>
.categories-title-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.categories-title {
  color: transparent;
  background-image: linear-gradient(to bottom, #67B6FF, #FFFFFF);
  background-clip: text;
  margin: 0;
}

.categories-back-button {
  width: 7vw;
  height: 7vw;
  position: absolute;
  left: 0;
}

.categories-page {
  margin: 0 7vw;
  margin-top: 10vh;
}

.categories-grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 15% 5%;
  margin-top: 10vh;
}

.categories-button {
  width: 100%;
  height: 15vh;
}

/* Tablet */
@media screen and (max-width: 1050px ) and (orientation: Portrait), (max-width: 700) {
  .categories-grid-container {
    grid-template-columns: 1fr 1fr;
    gap: 10% 5%;
  }
  .categories-back-button{
    width: 10vw;
    height: 10vw;
  }
}

/* Mobile */
@media screen and (max-width: 500px) {
  .categories-title-container{
    justify-content: flex-end;
  }
  .categories-back-button{
    width: 12vw;
    height: 12vw;
  }
  .categories-grid-container {
    grid-template-columns: 1fr;
    gap: 3%;
  }
  .categories-button{
    height: 9.5vh;
  }
  .categories-grid-container{
    margin-top: 4vh;
  }
  .categories-page{
    margin-top: 4vh;
  }
}
</style>
