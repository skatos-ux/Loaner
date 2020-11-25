<template>
  <div class="login__form p-4 m-6">
    <div class="field">
      <label class="label is-size-7 has-text-left">Nom d'utilisateur</label>
      <div class="control has-icons-left">
        <input class="input" type="text" required>
        <span class="icon is-small is-left">
          <font-awesome-icon :icon="['fas', 'user']" />
        </span>
      </div>
    </div>
    <div class="field">
      <label class="label is-size-7 has-text-left	">Mot de passe</label>
      <div class="control has-icons-left">
        <input class="input" type="password" required>
        <span class="icon is-small is-left">
          <font-awesome-icon :icon="['fas', 'key']" />
        </span>
      </div>
    </div>
    <div class="field">
      <label class="label is-size-7 has-text-left">
        <input type="checkbox">
        Remember me
      </label>
    </div>
    <div class="field">
      <input class="button is-success is-fullwidth is-size-6" type="button" value="Se connecter">
    </div>

  </div>

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class LoginForm extends Vue {

}
</script>

<style scoped lang="scss">
  .login__form {
    box-shadow: 0 0 0 1px #dbdbdb;
    border-radius: 0 0 4px 4px;
    min-width: 200px;
    max-width: 500px;
    width: 100%;
  }
</style>