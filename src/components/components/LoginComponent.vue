<template>
  <section @submit="submitForm" class="section--2 login__form p-4 m-6 animate__animated animate__fadeIn">
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
    <div class="field">
      <input class="button is-success is-fullwidth is-size-6" type="button" @click="submitForm" value="Se connecter">
    </div>
  </section>

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class LoginComponent extends Vue {
  form =  {
    username: '',
    password: '',
    remember: false
  }

  submitForm(){
    console.log(this.form)
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