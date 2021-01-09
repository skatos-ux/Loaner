<template>
  <div class="mainpage">
    <div v-if="!user.temporaryPassword" class="mainpage__header">
      <NavBar/>
    </div>
    <div class="mainpage__body">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import NavBar from "@/components/components/NavBar.vue";

@Component({
  components: { NavBar }
})
export default class MainPage extends Vue {
  user = this.$store.state.auth.user

  mounted() {
    if(!this.user.logged) {
      this.$router.push("/")
    }
  }

}
</script>

<style scoped lang="scss">
  @import "../scss/globals";
  .mainpage {
    position: relative;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    &__header {
      position: relative;
      z-index: 1;
    }
    &__body {
      position: relative;
      width: 100%;
      height: calc(100% - #{$navbar-height} - #{$dashboard-margin * 2});
    }
  }
</style>