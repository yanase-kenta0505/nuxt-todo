<template>
  <v-app>
    <v-btn
      color="primary"
      elevation="2"
      style="width: 100px;"
      class="ml-15 mt-10"
      @click="logout"
      v-if="AutheticatedUser"
    >
      ログアウト
    </v-btn>
    <v-row v-else>
      <v-col >
        <v-card width="80%" class="mx-auto mt-15" elevation="5">
          <v-card-title>
            <h1 class="display-1">新規登録</h1>
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                prepend-icon="mdi-account-circle"
                label="email"
                :rules="[rules.email]"
                v-model="email"
              />
              <v-text-field
                prepend-icon="mdi-lock"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                label="パスワード"
                :type="showPassword ? 'text' : 'password'"
                @click:append="showPassword = !showPassword"
                v-model="password"
              />
              <v-card-actions>
                <v-btn class="info mx-auto" @click="signup">登録</v-btn>
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card width="80%" class="mx-auto mt-15" elevation="5">
          <v-card-title>
            <h1 class="display-1">ログイン</h1>
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                prepend-icon="mdi-account-circle"
                label="email"
                :rules="[rules.email]"
                v-model="loginEmail"
              />
              <v-text-field
                prepend-icon="mdi-lock"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                label="パスワード"
                :type="showPassword ? 'text' : 'password'"
                @click:append="showPassword = !showPassword"
                v-model="loginPassword"
              />
              <v-card-actions>
                <v-btn class="info mx-auto" @click="login">ログイン</v-btn>
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import firebase from '~/plugins/firebase'
// firebase.auth()を「auth」という名前で「~/plugins/firebase」から呼び出す
import { auth } from '~/plugins/firebase'

export default {
  data() {
    return {
      showPassword: false,
      AutheticatedUser: '',
      email: '',
      password: '',
      loginEmail: '',
      loginPassword: '',
      rules: {
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        },
      },
    }
  },
  methods: {
    signup() {
      auth
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user
          console.log(user)
          console.log('登録完了')

          // ...
        })
        .catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
          console.log('登録失敗')
          console.log(errorCode)
          console.log(errorMessage)
          // ..
        })

      this.email = ''
      this.password = ''
    },
    logout() {
      auth.signOut()
    },
    login() {
      auth
        .signInWithEmailAndPassword(this.loginEmail, this.loginPassword)
        .catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
          console.log(errorCode)
          console.log(errorMessage)
        })
      this.loginEmail = ''
      this.loginPassword = ''
    },
  },
  mounted() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log('login')
        this.AutheticatedUser = true
      } else {
        console.log('logout')
        this.AutheticatedUser = false
      }
    })
  },
}
</script>

<style lang="scss" scoped></style>
