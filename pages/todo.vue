<template>
  <v-app>
    <v-container>
    <div>
      <h1 class="ml-10 mt-10">Your Todo List</h1>
    </div>
    <p class="ml-10 mt-10">{{ $store.state.todo.message }}</p>
    <v-row class="mt-10">
      <v-col>
        <v-text-field
          label="Todo"
          hide-details="auto"
          style="width: 300px;"
          class="ml-10"
          :value="$store.state.todo.message"
          @input="changeMessage($event)"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-btn depressed > 
          send
        </v-btn>
      </v-col>
    </v-row>
    
    </v-container>
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
      console.log(e)
      this.$store.dispatch('todo/changeMessage', e)
    },
  },
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=STIX+Two+Text:ital@1&display=swap');
// p {
//   font-family: 'STIX Two Text', serif;
// }

// input {
//   font-family: 'STIX Two Text', serif;
// }

* {
  font-family: 'STIX Two Text', serif;
  padding: 0;
}
</style>
