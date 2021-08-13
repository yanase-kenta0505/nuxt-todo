<template>
  <v-app>
    <v-row
      class="yellow"
      style="height: auto; width: 100%;"
      align-content="center"
    >
      <v-row no-gutters style="height: 300px;" justify="center">
        <v-col class="red" cols="6">
          <v-col>
            <h1 class="mt-10 pl-10">Your Todo List</h1>
          </v-col>
          <v-col>
            <p class="mt-10 pl-10">{{ $store.state.todo.message }}</p>
          </v-col>
          <v-row no-gutters class="mt-10">
            <v-col cols="8" class="ml-10">
              <v-text-field
                label="Todo"
                hide-details="auto"
                :value="$store.state.todo.message"
                @input="changeMessage($event)"
              ></v-text-field>
            </v-col>
            <v-col cols="2" class="ml-10">
              <v-btn depressed @click="add">
                SEND
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-row>
  </v-app>
</template>

<script>
export default {
  // data() {
  //   return {
  //     message:"hello"
  //   }
  // },
  methods: {
    // changeMessage(e){
    //   this.message = e
    // }
    changeMessage(e) {
      this.$store.dispatch('todo/changeMessage', e)
    },
    add() {
      console.log('foo')
      this.$store.dispatch('todo/add')
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
</style>
