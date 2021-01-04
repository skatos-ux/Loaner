<template>
  <form @submit="loginForm" class="section--2 login__form p-4 m-6 animate__animated animate__fadeIn">
    <div class="field">
      <label class="label is-size-7 has-text-left">Prénom</label>
      <div class="control has-icons-left">
        <input v-model="form.firstName" class="input" type="text" required>
        <span class="icon is-small is-left">
          <font-awesome-icon :icon="['fas', 'user']" />
        </span>
      </div>
    </div>
    <div class="field">
      <label class="label is-size-7 has-text-left">Nom</label>
      <div class="control has-icons-left">
        <input v-model="form.lastName" class="input" type="text" required>
        <span class="icon is-small is-left">
          <font-awesome-icon :icon="['fas', 'user']" />
        </span>
      </div>
    </div>
    <div class="field">
      <label class="label is-size-7 has-text-left	">Mot de passe</label>
      <div class="control has-icons-left">
        <input v-model="form.password" class="input" type="password" required>
        <span class="icon is-small is-left">
          <font-awesome-icon :icon="['fas', 'key']" />
        </span>
      </div>
    </div>
    <article v-show="failLogin" class="message is-danger">
      <div class="message-body is-size-7">
        Nom d'utilisateur ou mot de passe incorrecte
      </div>
    </article>
    <article v-show="backError" class="message is-danger">
      <div class="message-body is-size-7">
        Une erreur interne est survenue, veuillez réessayer dans quelques instants
      </div>
    </article>
    <div class="login__form--footer">
      <input id="login" class="button is-success is-fullwidth is-size-6 login__form--login" type="submit" value="Se connecter">
      <button id="register" @click="registerForm" class="button is-info is-fullwidth is-size-6 login__form--register">S'enregistrer</button>
    </div>
  </form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class LoginForm extends Vue {
  form =  {
    id: null,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    token: '',
    admin: false,
    temporaryPassword: false
  }

  failLogin = false
  backError = false

  loginForm(event: Event){
    const input = document.getElementById("login")
    input!.className +=  " control is-loading"
    event.preventDefault()


    this.$api.post("/auth/login", this.form).then((res) => {
      this.form.id = res.data.user.id
      this.form.email = res.data.user.email
      this.form.token = res.data.token
      this.form.admin = res.data.user.admin
      this.form.temporaryPassword = res.data.user.temporaryPassword
      if(res.data.auth) {
        this.$store.dispatch('login', this.form)
        this.$router.push("/mainpage/dashboard")
      } else {
        this.failLogin = true
        input!.classList.remove("control", "is-loading")
      }
    }).catch((error) => {
      if(error.response.status === 400) {
        this.failLogin = true
      } else {
        this.backError = true
      }
      input!.classList.remove("control", "is-loading")
    })

  }

  registerForm(event: { target: HTMLInputElement}) {
    this.$router.push("/register")
  }

  //TODO register
  //TODO add backend
}
</script>

<style scoped lang="scss">
  @import "./../../../node_modules/animate.css/animate.css";
  @import "./../../scss/globals";
  .login__form {
    min-width: 200px;
    max-width: 500px;
    width: 100%;
    &--footer {
      display: flex;
      flex-direction: row-reverse;
      justify-content: center;
      align-items: center;
    }
    &--login {
      margin-left: 5px;
    }
    &--register {
      margin-right: 5px;
    }
  }
</style>