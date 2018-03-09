import Vue from 'vue'
import App from './App'
import * as firebase from 'firebase'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import { store } from './store'

Vue.use(Vuetify)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyDIyG3c3N2_yCKhrlwuW6BURTbf5Ueq3Oc',
      authDomain: 'seedabit-ponto.firebaseapp.com',
      databaseURL: 'https://seedabit-ponto.firebaseio.com',
      projectId: 'seedabit-ponto',
      storageBucket: 'seedabit-ponto.appspot.com'
    })
    this.$store.dispatch('loadRegisters')
  }
})
