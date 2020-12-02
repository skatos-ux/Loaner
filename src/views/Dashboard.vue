<template>
  <div class="dashboard">
    <div v-if="isAdmin" class="dashboard__header">
      <NavBar/>
    </div>
    <div :class="'dashboard__body' + adminLayout()">
      <DashboardLayout :user-rank="this.user.rank"/>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import CartComponent from "@/components/layouts/CartLayout.vue";
import MainPanelLayout from "@/components/layouts/MainPanelLayout.vue";
import NavBar from "@/components/components/NavBar.vue";
import DashboardLayout from "@/components/layouts/DashboardLayout.vue";
@Component({
  components: {DashboardLayout, NavBar, MainPanelLayout, CartComponent}
})
export default class Dashboard extends Vue {
  user = this.$store.state.auth.user

  isAdmin(){
      return this.user.rank === 0
  }
  adminLayout() {
    if(this.isAdmin()){
      return "--admin"
    } else {
      return ""
    }
  }
}
</script>

<style scoped lang="scss">
  @import "./../scss/globals";
  .dashboard {
    position: relative;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    &__body--admin {
      position: relative;
      width: 100%;
      height: calc(100% - #{$navbar-height} - #{$dashboard-margin * 2});
    }
  }
</style>