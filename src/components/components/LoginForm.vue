<template>
  <form @submit="submitForm" class="section--2 login__form p-4 m-6 animate__animated animate__fadeIn">
    <div class="field">
      <label class="label is-size-7 has-text-left">Nom d'utilisateur</label>
      <div class="control has-icons-left">
        <input v-model="form.username" class="input" type="text" required>
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
        Nom d'utilisateur ou mot de passe incorrecte (c'est admin:admin espèce de con)
      </div>
    </article>
    <div id="submit" class="field">
      <input class="button is-success is-fullwidth is-size-6" type="submit" value="Se connecter">
    </div>
  </form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class LoginForm extends Vue {
  form =  {
    username: '',
    password: '',
    rank: 0,
    remember: false
  }
  failLogin = false

  submitForm(event: Event){
    const input = document.querySelector("#submit")
    input!.className +=  " control is-loading"

    //TEMPORARY
    if(this.form.username === "admin" && this.form.password === "admin") {
      this.$store.dispatch('login', this.form)
      this.$router.push("/dashboard")
    } else {
      this.failLogin = true
      input!.classList.remove("control", "is-loading")
      event.preventDefault()
    }

    /*
    this.$api.post("/login", this.form).then((res) => {
      console.log(res.data)
    }).catch((error) => {
      console.log(error)
      element.preventDefault()
    })
    */
  }
}
</script>

<style scoped lang="scss">
  @import "./../../../node_modules/animate.css/animate.css";
  @import "./../../scss/globals";
  .login__form {
    min-width: 200px;
    max-width: 500px;
    width: 100%;
  }
</style>