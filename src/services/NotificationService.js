import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export default class NotificationService {
  constructor () {
    this.options = {
      theme: toast.THEME.COLORED
    }
  }

  send (message) {
    toast.info(message, this.options)
  }
}
