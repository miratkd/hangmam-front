<template>
  <div  class="categories-page">
    <div class="categories-title-container">
      <IconButton :img="require('@/assets/back.png')" class="categories-back-button" @click="$router.push('/')"/>
      <h1 class="categories-title">Categorias</h1>
    </div>
    <div class="categories-grid-container">
      <ButtonComponent @click="createMatch(category.id)" class="categories-button" v-for="category in categories" :key="category.id" :text="category.name + ' - ' + category.finishedWords + '/' + category.allWords"/>
    </div>
    <LoadingComponent v-if="isLoading"/>
  </div>
</template>

<script>
import IconButton from '@/components/IconButton.vue'
import ButtonComponent from '../components/ButtonComponent.vue'
import axios from 'axios'
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
      config: { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } }
    }
  },
  created () {
    axios.get('https://hangman-production-0cde.up.railway.app/api/categories', this.config).then(resp => {
      this.categories = resp.data.data
      this.isLoading = false
    }).catch(error => {
      if (error.response.status === 401) {
        localStorage.removeItem('token')
        this.$router.push('/')
      }
    })
  },
  methods: {
    createMatch (id) {
      this.isLoading = true
      axios.post('https://hangman-production-0cde.up.railway.app/api/match', { categoryId: id }, this.config).then(resp => {
        this.$router.push({ name: 'match', params: { id: resp.data.data.id } })
      }).catch(error => {
        if (error.response.status === 401) {
          localStorage.removeItem('token')
          this.$router.push('')
        }
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
  position: absolute;
  left: 0;
}

.categories-page {
  margin: 0 7vw;
  margin-top: 10vh;
}
.categories-grid-container{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 15% 5%;
  margin-top: 10vh;
}
.categories-button{
  width: 100%;
  height: 15vh;
}
</style>
