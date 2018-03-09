<template>
  <v-app>
    <v-toolbar>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat @click.native.stop="dialog = true"><v-icon left>{{ icon }}</v-icon>{{ btnText }}</v-btn>
    </v-toolbar>
    <main>
      <router-view></router-view>
    </main>
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">{{ modal.title }}</v-card-title>
        <v-card-text>{{ modal.description }}</v-card-text>
        <v-form @submit.prevent="onCreateRegister">
          <v-flex>
            <v-text-field
              label="Nome"
              v-model="name"
              :rules="nameRules"
              required>
            </v-text-field>
          </v-flex>
          <v-text-field
            label="Sobrenome"
            v-model="surname"
            :rules="nameRules"
            required>
          </v-text-field>
          <v-flex>
          </v-flex>
          <v-flex>
            <v-text-field
              label="CPF"
              v-model="cpf"
              :rules="cpfRules"
              required></v-text-field>
          </v-flex>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" flat="flat" @click.native="dialog = false">{{ modal.cancel }}</v-btn>
            <v-btn color="green darken-1" flat="flat" :disabled="!formIsValid" type="submit" @click.native="dialog = false">{{ modal.confirm }}</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      cpf: '',
      name: '',
      surname: '',
      title: 'Ponto Seed',
      icon: 'done',
      btnText: 'CheckIn',
      dialog: false,
      modal: {
        title: 'Registrar Ponto',
        description: 'Insira seu CPF para registrar o ponto',
        cancel: 'Cancelar',
        confirm: 'Registrar'
      },
      cpfRules: [
        v => (v && v.length === 11) || 'O CPF precisa ter 11 dígitos'
      ],
      nameRules: [
        v => (v && v !== '') || 'Este campo precisa ser preenchido'
      ]
    }
  },
  computed: {
    formIsValid () {
      return this.cpf.length === 11 || this.name !== '' || this.surname !== ''
    }
  },
  methods: {
    onCreateRegister () {
      const registerData = {
        name: this.name,
        surname: this.surname,
        cpf: this.cpf
      }
      this.$store.dispatch('createRegister', registerData)
    }
  }
}
</script>
