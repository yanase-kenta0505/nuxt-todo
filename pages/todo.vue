<template>
  <v-app>
    <v-row style="height: auto; width: 100%;" align-content="center">
      <v-row no-gutters style="height: 600px;" justify="center">
        <v-col cols="6">
          <v-col>
            <h1 class="mt-10 pl-10 mb-10">Your Todo List</h1>
            <ul class="ml-10">
              <li v-for="todo in todos" :key="todo.id">
                <span v-if="todo.created">
                  <input
                    type="checkbox"
                    :checked="todo.done"
                    @change="toggle(todo)"
                  />
                  <span :class="{ done: todo.done }">
                    {{ todo.name }} {{ todo.created.toDate() | dateFilter }}
                  </span>
                  <v-btn small class="ml-5" @click="remove(todo.id)">X</v-btn>
                </span>
              </li>
            </ul>
          </v-col>
          <v-row no-gutters class="mt-10">
            <v-col cols="8" class="ml-10">
              <v-text-field
                label="Todo"
                hide-details="auto"
                v-model="name"
              ></v-text-field>
            </v-col>
            <v-col cols="2" class="ml-10">
              <v-btn depressed @click="add">
                Add
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-row>
  </v-app>
</template>

<script>
import moment from 'moment'
export default {
  created() {
    this.$store.dispatch('todo/init')
  },
  data() {
    return {
      name: '',
      done: false,
    }
  },
  methods: {
    add() {
      // console.log(this.name)
      this.$store.dispatch('todo/add', this.name)
      this.name = ''
      // console.log(this.$store.state.todo.todos)
    },
    remove(id) {
      this.$store.dispatch('todo/remove', id)
    },
    toggle(todo) {
      this.$store.dispatch('todo/toggle', todo)
    },
  },
  computed: {
    todos() {
      return this.$store.getters['todo/orderdTodos']
    },
  },
  filters: {
    dateFilter(date) {
      return moment(date).format('YYYY/MM/DD HH:mm:ss')
    },
  },
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=STIX+Two+Text:ital@1&display=swap');

* {
  font-family: 'STIX Two Text', serif;
  padding: 0;
  font-size: 20px;
  & h1 {
    font-size: 30px;
  }
}

li > span > span.done {
  text-decoration: line-through;
}
</style>
