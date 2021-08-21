<template>
  <v-app>
    <div>
      <nuxt-link to="/signup">
        WELCOME TODO LIST
      </nuxt-link>
    </div>
  </v-app>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=STIX+Two+Text:ital@1&display=swap');
* {
  font-family: 'STIX Two Text', serif;
}
div {
  display: flex;
  height: 100%;
  justify-content: center;
  
  & a {
    display: block;
    width: 600px;
    font-size: 40px;
    height: 70px;
    text-decoration: none;
    align-self: center;
    text-align: center;
    
    &:hover {
      color: rgb(202, 118, 202);
    }
  }
}
</style>
