import axios from 'axios'
import router from '@/router'
import NotificationService from './NotificationService'
export default class RequestService {
  constructor () {
    this.config = { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } }
    this.url = 'https://hangman-production-0cde.up.railway.app/api/'
  }

  // requests
  getCategories () {
    return axios.get(this.url + 'categories', this.config)
  }

  createMatch (id) {
    return axios.post(this.url + 'match', { categoryId: id }, this.config)
  }

  login (credentials) {
    return axios.post(this.url + 'login', credentials, this.config)
  }

  createAccount (account) {
    return axios.post(this.url + 'users', account, this.config)
  }

  me () {
    return axios.get(this.url + 'me', this.config)
  }

  // functions
  isTokenExpired (error) {
    if (error.response.status === 401 && error.response.data.message === 'Unauthenticated.') {
      localStorage.removeItem('token')
      router.push('/?login=true')
      return true
    }
  }

  genericErrorMessage () {
    new NotificationService().send('Desculpe, não foi possível completar sua requisição, por favor tente novamente mais tarde')
  }
}
