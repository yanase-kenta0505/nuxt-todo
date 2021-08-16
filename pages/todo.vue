<template>
  <v-app>
    <!-- <v-row style="height: auto; width: 100%;" align-content="center">
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
    </v-row> -->
    <template>
      <v-data-table
        :headers="headers"
        :items="$store.getters['todo/orderdTodos']"
        :search="search"
        sort-by="dedline"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>YOUR TODO LIST</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
              class="mr-10"
            ></v-text-field>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="teal accent-3"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  New Todo Item
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.todo"
                          label="Todo"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-menu
                          v-model="menu2"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="date"
                              label="Picker without buttons"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="date"
                            @input="menu2 = false"
                          ></v-date-picker>
                        </v-menu>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    Cancel
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="add(editedItem)">
                    Add or save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5">
                  Are you sure you want to delete this item?
                </v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete">
                    Cancel
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm">
                    OK
                  </v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>

        <!-- この「v-slot:[`item.done`]="{ item }"」は意味的には
       headerの「done」の列に＜template＞以下の要素を入れていくようなイメージ -->
        <template v-slot:[`item.done`]="{ item }">
          <v-simple-checkbox
            v-model="item.done"
            disabled
            @click="done(item)"
          ></v-simple-checkbox>
        </template>

        <!-- <template v-slot:[`item.dedline`]="{ item }"></template> -->

        <template v-slot:[`item.status`]="{ item }">
          <v-btn color="primary" depressed elevation="1" v-show="item.done">
            Complete
          </v-btn>
          <v-btn color="error" depressed elevation="1" v-show="!item.done">
            Incomplete
          </v-btn>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)">
            mdi-delete
          </v-icon>
        </template>

        <template v-slot:no-data>
          <v-btn color="primary">
            Reset
          </v-btn>
        </template>
      </v-data-table>
    </template>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    search: '',
    dialog: false,
    dialogDelete: false,
    deleteId: null,
    headers: [
      {
        text: 'TODO',
        align: 'start',
        sortable: false,
        value: 'todo',
      },
      { text: 'Dedline', value: 'dedline' },
      { text: 'Status', value: 'status' },
      { text: 'Done', value: 'done', sortable: false },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    todos: [],
    editedIndex: -1,
    editedItem: {
      todo: '',
    },
    defaultItem: {
      todo: '',
    },

    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    menu: false,
    modal: false,
    menu2: false,
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Todo Item' : 'Edit Item'
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  created() {
    this.$store.dispatch('todo/init')
    // console.log(this.date)
  },



  methods: {
    done(item) {
      console.log(item)
      this.$store.dispatch('todo/done', item)
    },

    editItem(item) {
      // console.log(this.$store.state.todo.todos)
      // const id = item.id
      // const changeTodo = this.editedItem.todo
      // this.editedItem = Object.assign({}, item)
      // console.log(this.editedIndex)
      // this.$store.dispatch('todo/editItem',{
      //   id : id,
      //   item:item,
      //   editedIndex: this.editedIndex,
      //   changeTodo:changeTodo

      // })

      console.log(item)
      this.date = item.dedline
      this.editedItem.todo = item.todo
      this.editedIndex = this.$store.state.todo.todos.indexOf(item)
      console.log(this.editedIndex)
      this.dialog = true
    },

    deleteItem(item) {
      console.log(this.$store.state.todo.todos)
      console.log(item.id)
      this.deleteId = item.id
      this.editedIndex = this.$store.state.todo.todos.indexOf(item)
      console.log(this.editedIndex)
      // this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      // console.log(this.deleteId)
      this.$store.dispatch('todo/delete', this.deleteId)
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    add(editedItem) {
      if (this.editedIndex > -1) {
        // Object.assign(this.todos[this.editedIndex], this.editedItem)
        console.log(editedItem)
        // console.log(this.editedIndex)
        // console.log(this.$store.state.todo.todos[this.editedIndex].id)
        this.$store.dispatch('todo/editItem', {
          editedDate: this.date,
          editedItem: editedItem,
          editedIndex: this.editedIndex,
          editedId: this.$store.state.todo.todos[this.editedIndex].id,
        })
      } else {
        console.log(this.date)
        // this.$store.dispatch('todo/add', editedItem)
        this.$store.dispatch('todo/add', {
          editedItem: editedItem,
          date: this.date,
        })
      }
      this.close()
    },
  },
}
</script>
