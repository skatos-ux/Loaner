<template>
  <form @submit="chPassForm" class="section--2 chpass__form p-4 m-6 animate__animated animate__fadeIn">
    <div class="field">
      <h1 class="label is-size-5 has-text-centered is-fullwidth	">Changement de mot de passe</h1>
    </div>
    <div class="field">
      <label class="label is-size-7 has-text-left	">Ancien mot de passe</label>
      <div class="control has-icons-left">
        <label>
          <input id="oldpassword" v-model="$v.formChPass.oldPassword.$model" class="input" type="password" required>
        </label>
        <span class="icon is-small is-left">
          <font-awesome-icon :icon="['fas', 'key']" />
        </span>
      </div>
    </div>
    <div class="field">
      <label class="label is-size-7 has-text-left	">Nouveau mot de passe</label>
      <div class="control has-icons-left">
        <label>
          <input id="password" v-model="$v.formChPass.newPassword.$model" class="input" type="password" required>
        </label>
        <span class="icon is-small is-left">
          <font-awesome-icon :icon="['fas', 'key']" />
        </span>
      </div>
    </div>
    <div class="field">
      <label class="label is-size-7 has-text-left	">Confirmer le mot de passe</label>
      <div class="control has-icons-left">
        <label>
          <input id="confpassword" v-model="$v.formChPass.confPassword.$model" class="input" type="password" required>
        </label>
        <span class="icon is-small is-left">
          <font-awesome-icon :icon="['fas', 'key']" />
        </span>
      </div>
    </div>
    <article v-show="backSuccess" class="message is-success">
      <div class="message-body is-size-7">
        Changement de mot de passe effectué, vous allez être redirigé vers la page d'authentification
      </div>
    </article>
    <article v-show="failVerify || $v.formChPass.$invalid" class="message is-danger">
      <div class="message-body is-size-7">
        Les mots de passes ne correspondent pas, aussi l'utilisation de l'ancien mot de passe est interdite
      </div>
    </article>
    <article v-show="wrongPasswordError" class="message is-danger">
      <div class="message-body is-size-7">
        Votre ancien mot de passe est incorrect
      </div>
    </article>
    <article v-show="backError" class="message is-danger">
      <div class="message-body is-size-7">
        Une erreur interne est survenue, veuillez réessayer dans quelques instants
      </div>
    </article>
    <div class="chpass__form__form--footer">
      <button id="login" :disabled="backSuccess" class="button is-success is-fullwidth is-size-6" type="submit">Changer le mot de passe</button>
    </div>
  </form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { required } from "vuelidate/lib/validators";
import authHeader from "@/services/auth-header";

@Component({
  validations: {
    formChPass: {
      email: {
        required,
      },
      oldPassword: {
        required,
      },
      newPassword: {
        required,
      },
      confPassword: {
        required,
      }
    }
  }
})
export default class PassChangeForm extends Vue {

  user = this.$store.state.auth.user

  backSuccess = false
  backError = false
  wrongPasswordError = false

  formChPass = {
    email: this.user.email,
    oldPassword: "",
    newPassword: "",
    confPassword: ""
  }
  
  mounted() {
    const confPasswordInput = document.getElementById('confpassword');
    if(confPasswordInput) {
      confPasswordInput.onpaste = e => e.preventDefault();
    }

    if(this.user.temporaryPassword === false) {
      this.$router.push("/")
    }

  }

  get failVerify() {
    return (this.formChPass.newPassword !== this.formChPass.confPassword || this.formChPass.oldPassword === this.formChPass.newPassword)
  }

  chPassForm(event: Event) {
    if(!this.backSuccess) {
      event.preventDefault()

      this.$api.post('/auth/password/change', this.formChPass, { headers: authHeader(this.user.token) }).then(() => {
        this.backSuccess = true

        this.backError = false
        this.wrongPasswordError = false

        setTimeout(() => {
          this.$router.push("/")
        }, 1000)
      }).catch((error) => {
        if(error.response) {
          if(error.response.data.message === "Invalid name or old password") {
            this.wrongPasswordError = true
          } else {
            this.backError = true
          }
        } else {
          this.backError = true
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">

.chpass__form {
  min-width: 200px;
  max-width: 500px;
  width: 100%;
}

</style>