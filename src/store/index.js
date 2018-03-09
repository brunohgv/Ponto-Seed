import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedRegisters: [
      {name: 'Bruno', surname: 'Vasconcelos', cpf: '09973738497', openDate: new Date(), closeDate: undefined, open: true},
      {name: 'Nome', surname: 'Sobrenome', cpf: '65498765478', openDate: new Date(), closeDate: undefined, open: true},
      {name: 'Nome2', surname: 'Sobrenome2', cpf: '65423456478', openDate: new Date(), closeDate: undefined, open: true},
      {name: 'Nome3', surname: 'Sobrenome3', cpf: '65498876578', openDate: new Date(), closeDate: undefined, open: true},
      {name: 'Nome4', surname: 'Sobrenome4', cpf: '65498876570', openDate: new Date(), closeDate: undefined, open: true}
    ]
  },
  mutations: {
    createRegister (state, payload) {
      state.loadedRegisters.push(payload)
    }
  },
  actions: {
    createRegister ({commit}, payload) {
      const register = {
        name: payload.name,
        surname: payload.surname,
        cpf: payload.cpf,
        openDate: new Date(),
        closeDate: undefined,
        open: true
      }
      // Firebase Time and store
      commit('createRegister', register)
    }
  },
  getters: {
    loadedRegisters (state) {
      return state.loadedRegisters.sort((registerA, registerB) => {
        return registerA.openDate > registerB.openDate
      })
    }
  }
})
