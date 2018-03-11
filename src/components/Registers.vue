<template>
  <v-container>
    <v-card>
      <v-card-title>
        Registros
        <v-spacer></v-spacer>
        <v-text-field
          append-icon="search"
          label="Search"
          single-line
          hide-details
          v-model="search"
        ></v-text-field>
      </v-card-title>
        <v-data-table
          :headers="headers"
          :items="registers"
          :search="search"
          :loading="loading"
          hide-actions
          class="elevation-1"
        >
        <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
          <template slot="items" slot-scope="props">
            <td>{{ props.item.name }}</td>
            <td>{{ props.item.surname }}</td>
            <td>{{ props.item.cpf | filterCpf }}</td>
            <td>{{ props.item.openDate | comprehensiveDate }}</td>
            <td>{{ props.item.closeDate | comprehensiveDate }}</td>
            <td>{{ totalTimeBetween(props.item.openDate, props.item.closeDate) }}</td>
          </template>
          <template v-if="!loading" slot="no-data">
            <v-alert :value="true" color="error" icon="warning">
              Estamos sem dados :(
            </v-alert>
          </template>
          <v-alert slot="no-results" :value="true" color="error" icon="warning">
            Não achamos nenhum resultado para "{{ search }}" :(
          </v-alert>
          <template slot="page-text">

          </template>
      </v-data-table>
    </v-card>
    <!-- JSON do firebase com os registros carregados
    <pre>{{ registers }}</pre> -->
  </v-container>
</template>

<script>
import { filterCpf, comprehensiveDate } from '@/filters/Filters'
export default {
  data () {
    return {
      search: '',
      headers: [
        {text: 'Nome', value: 'name'},
        {text: 'Sobrenome', value: 'surname'},
        {text: 'CPF', value: 'cpf'},
        {text: 'Data de Chegada', value: 'openDate'},
        {text: 'Data de saída', value: 'closeDate'},
        {text: 'Carga horária', value: 'hours'}
      ],
      items: [{name: 'Bruno', surname: 'Vasconcelos'}]
    }
  },
  computed: {
    registers () {
      return this.$store.getters.loadedRegisters
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  filters: {
    filterCpf,
    comprehensiveDate
  },
  methods: {
    totalTimeBetween (stringDate1, stringDate2) {
      var date1 = new Date(stringDate1)
      var date2 = new Date(stringDate2)
      var hours = date2.getHours() - date1.getHours()
      var minutes = date2.getMinutes() - date1.getMinutes()
      var seconds = date2.getSeconds() - date1.getSeconds()
      if (seconds < 0) {
        minutes--
        seconds = 60 + seconds
      }
      if (minutes < 0) {
        hours--
        minutes = 60 + minutes
      }
      if (hours < 0) {
        hours = 24 + hours
      }
      if (seconds < 10) {
        seconds = '0' + seconds
      }
      if (minutes < 10) {
        minutes = '0' + minutes
      }
      if (hours < 10) {
        hours = '0' + hours
      }
      return hours + ':' + minutes + ':' + seconds
    }
  }
}
</script>
