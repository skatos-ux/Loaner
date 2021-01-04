<template>
  <form @submit="registerForm" class="section--2 register__form p-4 m-6 animate__animated animate__fadeIn">
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
      <label class="label is-size-7 has-text-left">Mail</label>
      <div class="control has-icons-left">
        <input v-model="form.email" class="input" type="email" required>
        <span class="icon is-small is-left">
          <font-awesome-icon :icon="['fas', 'envelope']" />
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
      <label class="label is-size-7 has-text-left	">Confirmer le mot de passe</label>
      <div class="control has-icons-left">
        <input v-model="confPassword" class="input" type="password" required>
        <span class="icon is-small is-left">
          <font-awesome-icon :icon="['fas', 'key']" />
        </span>
      </div>
    </div>
    <article v-show="failRegister" class="message is-danger">
      <div class="message-body is-size-7">
        Cet utilisateur existe déjà
      </div>
    </article>
    <article v-show="unMatchPass" class="message is-danger">
      <div class="message-body is-size-7">
        Les mots de passes ne correspondent pas
      </div>
    </article>
    <article v-show="backError" class="message is-danger">
      <div class="message-body is-size-7">
        Une erreur interne est survenue, veuillez réessayer dans quelques instants
      </div>
    </article>
    <input class="button is-info is-fullwidth is-size-6 register__form--register" type="submit" value="S'enregistrer">
  </form>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class RegisterForm extends Vue {
  form =  {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    admin: false
  }
  confPassword = ''


  failRegister = false
  unMatchPass = false
  backError = false

  registerForm(event: Event) {
    event.preventDefault()

    if(this.form.password !== this.confPassword) {
      this.unMatchPass = true
      return
    }

    this.$api.post("/users/add", this.form).then((res) => {
      console.log(res)
    }).catch((error) => {
      if(error.response.status === 400) {
        this.failRegister = true
      } else {
        this.backError = true
      }
    })
  }
}
</script>

<style scoped lang="scss">
@import "./../../../node_modules/animate.css/animate.css";
@import "./../../scss/globals";
.register__form {
  min-width: 200px;
  max-width: 500px;
  width: 100%;
}
</style>