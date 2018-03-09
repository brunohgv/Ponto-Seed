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
            <td>{{ props.item.cpf }}</td>
            <td>{{ props.item.openDate }}</td>
            <td>{{ props.item.closeDate }}</td>
            <td>{{  }}</td>
          </template>
          <template slot="no-data">
            <v-alert :value="true" color="error" icon="warning">
              Estamos sem dados :(
            </v-alert>
          </template>
          <v-alert slot="no-results" :value="true" color="error" icon="warning">
            Não achamos nenhum resultado para "{{ search }}" :(
          </v-alert>
      </v-data-table>
    </v-card>
    <pre>{{ registers }}</pre>
  </v-container>
</template>

<script>
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
    methods: {

    }
  }
</script>
