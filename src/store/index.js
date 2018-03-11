import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedRegisters: [
    ],
    loading: false
  },
  mutations: {
    setLoadedRegisters (state, payload) {
      state.loadedRegisters = payload
    },
    createRegister (state, payload) {
      state.loadedRegisters.push(payload)
    },
    closeRegister (state, payload) {
      const register = state.loadedRegisters.find(state => {
        return register.id === payload.id
      })
      register.closeDate = payload.closeDate
      register.open = payload.open
    },
    setLoading (state, payload) {
      state.loading = payload
    }
  },
  actions: {
    loadRegisters ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('registers').once('value')
        .then((data) => {
          const registers = []
          const obj = data.val()
          for (var key in obj) {
            registers.push({
              id: key,
              name: obj[key].name,
              surname: obj[key].surname,
              cpf: obj[key].cpf,
              openDate: obj[key].openDate,
              closeDate: obj[key].closeDate,
              open: obj[key].open
            })
          }
          commit('setLoadedRegisters', registers)
          commit('setLoading', false)
        })
        .catch((error) => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    createRegister ({commit}, payload) {
      const register = {
        name: payload.name,
        surname: payload.surname,
        cpf: payload.cpf,
        openDate: new Date().toISOString(),
        open: true
      }
      // Firebase store
      firebase.database().ref('registers').push(register)
        .then((data) => {
          const key = data.key
          commit('createRegister', {
            ...register,
            id: key
          })
        })
        .catch((error) => {
          console.log(error)
        })
    },
    closeRegister ({commit}, payload) {
      const updateObj = {}
      updateObj.closeDate = new Date().toISOString()
      updateObj.open = false

      firebase.database().ref('registers').child(payload.id).update(updateObj)
        .then(() => {
          commit('closeRegister', payload)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  getters: {
    loadedRegisters (state) {
      return state.loadedRegisters.sort((registerA, registerB) => {
        return registerA.openDate > registerB.openDate
      })
    },
    loading (state) {
      return state.loading
    }
  }
})
