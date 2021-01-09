<template>
  <div class="dashboard">
      <DashboardLayout/>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import CartComponent from "@/components/layouts/CartLayout.vue";
import MainPanelLayout from "@/components/layouts/MainPanelLayout.vue";
import DashboardLayout from "@/components/layouts/DashboardLayout.vue";
@Component({
  components: {DashboardLayout, MainPanelLayout, CartComponent}
})
export default class Dashboard extends Vue {
  user = this.$store.state.auth.user
}
</script>

<style scoped lang="scss">
  .dashboard {
    height: 100%;
  }
</style>