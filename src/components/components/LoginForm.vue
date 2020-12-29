<template>
  <div class="section--2 login__form p-4 m-6 animate__animated animate__fadeIn">
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
    <div class="field">
      <label class="label is-size-7 has-text-left">
        <input v-model="form.remember" type="checkbox">
        Remember me
      </label>
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
      <input @click="registerForm" class="button is-info is-fullwidth is-size-6 login__form--register" type="submit" value="S'enregistrer">
      <input @click="loginForm" class="button is-success is-fullwidth is-size-6 login__form--login" type="submit" value="Se connecter">
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class LoginForm extends Vue {
  form =  {
    firstName: '',
    lastName: '',
    password: '',
    admin: false,
    token: '',
    remember: false
  }
  failLogin = false
  failRegister = false

  backError = false

  loginForm(event: { target: HTMLInputElement }){
    const input = event.target
    input.className +=  " control is-loading"

    this.$api.post("/auth/login", this.form).then((res) => {
      this.form.token = res.data.token
      this.form.admin = res.data.user.admin
      if(res.data.auth) {
        this.$store.dispatch('login', this.form)
        this.$router.push("/mainpage/dashboard")
      } else {
        this.failLogin = true
        input.classList.remove("control", "is-loading")
      }
    }).catch((error) => {
      if(error.response.status === 400) {
        this.failLogin = true
      } else {
        this.backError = true
      }
      input.classList.remove("control", "is-loading")
    })

  }

  registerForm(event: { target: HTMLInputElement}) {
    console.log("register")
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
      flex-direction: row;
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