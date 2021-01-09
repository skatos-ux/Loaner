<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="https://github.com/skatos-ux/Loaner">
        <img alt="logo" src="https://upload.wikimedia.org/wikipedia/commons/f/f0/Logo_Reseau_Polytech.svg" width="50" height="56">
      </a>
    </div>
    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <a v-if="user.admin"  class="navbar-item">
          <router-link to="/mainpage/dashboard">Dashboard</router-link>
        </a>
        <a v-if="user.admin"  class="navbar-item">
          <router-link to="/mainpage/users">Utilisateurs</router-link>
        </a>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <button @click="logout" class="button is-link navbar-logout">Se déconnecter</button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class NavBar extends Vue {
  user = this.$store.state.auth.user

  logout() {
    this.$store.dispatch('logout')
    this.$router.push("/")
  }
}
</script>

<style scoped lang="scss">
.navbar-logout {
  min-width: 180px;
  margin-right: 10px;
}
</style>