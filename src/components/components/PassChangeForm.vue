<template>
  <form @submit="chPassForm" class="section--2 chpass__form p-4 m-6 animate__animated animate__fadeIn">
    <div class="field">
      <label class="label is-size-7 has-text-left	">Nouveau mot de passe</label>
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
        <input v-model="form.confpassword" class="input" type="password" required>
        <span class="icon is-small is-left">
          <font-awesome-icon :icon="['fas', 'key']" />
        </span>
      </div>
    </div>
    <article v-show="failVerify" class="message is-danger">
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
      <button id="login" class="button is-success is-fullwidth is-size-6" type="submit">Changer le mot de passe</button>
    </div>
  </form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class PassChangeForm extends Vue {

  user = this.$store.state.auth.user

  failVerify = true
  backError = true

  form = {
    password: "",
    confpassword: ""
  }

  chPassForm() {
    console.log("hello")
  }


}
</script>

<style scoped lang="scss">

</style>