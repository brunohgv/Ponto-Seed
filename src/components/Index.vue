<template>
  <v-container>
    <v-layout row wrap>
      <v-flex mb-2 xs12 sm3 offset-sm2 v-for="register of registers" :key="register.openDate">
        <v-card v-if="register.open === true">
          <v-card-title>
            <div>
              <h3>{{ register.name }} {{ register.surname }}</h3>
              <div>
                {{ register.cpf | filterCpf }}
              </div>
            </div>
          </v-card-title>
          <v-card-text>
            <h2>{{ register.openDate | dateFormat }} - {{ hours }}:{{ minutes }}:{{ seconds }}</h2>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="closeRegister(register)">Fechar Registro</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <pre>{{ registers }}</pre>
  </v-container>
</template>

<script>
import { getZeroPad, filterCpf, dateFormat } from '@/filters/Filters'
export default {
  data () {
    return {
      hours: '',
      minutes: '',
      seconds: ''
    }
  },
  computed: {
    registers () {
      return this.$store.getters.loadedRegisters
    }
  },
  filters: {
    filterCpf,
    dateFormat
  },
  mounted () {
    setInterval(this.updateDateTime, 1000)
  },
  methods: {
    updateDateTime () {
      var now = new Date()
      this.hours = getZeroPad(now.getHours())
      this.minutes = getZeroPad(now.getMinutes())
      this.seconds = getZeroPad(now.getSeconds())
    },
    closeRegister (register) {
      register.open = false
      register.closeDate = new Date()
      this.$store.dispatch('closeRegister', {
        id: register.id
      })
    }
  }
}
</script>
