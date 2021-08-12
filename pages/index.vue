<template>
  <v-app>
    <div>
      <nuxt-link to="/todo">
        ようこそ TODOアプリへ
      </nuxt-link>
    </div>
  </v-app>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=STIX+Two+Text:ital@1&display=swap');
*{
  font-family: 'STIX Two Text', serif;
}
div {
  display: flex;
  height: 700px;
  justify-content: center;
  & a {
    font-size: 20px;
    
    color: white;
    height: 70px;
    align-self: center;
    text-decoration: none;
    &:hover{
      color: rgb(202, 118, 202);
    }
  }
}
</style>
