<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="https://bulma.io">
        <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
      </a>
      <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <a class="navbar-item">
          <router-link to="/mainpage/dashboard">Dashboard</router-link>
        </a>
        <a class="navbar-item">
          <router-link to="/mainpage/users">Utilisateurs</router-link>
        </a>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <a @click="logout" class="button is-link navbar-logout">
            <strong>Se déconnecter</strong>
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class NavBar extends Vue {
  logout() {
    this.$store.dispatch('logout')
    this.$router.push("/")
  }
}
</script>

<style scoped lang="scss">
.navbar-logout {
  max-width: 150px;
}
</style>