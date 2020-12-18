<template>
  <div class="dashboardLayout">
    <MainPanelLayout/>
    <CartLayout/>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import MainPanel from "@/components/layouts/MainPanelLayout.vue";
import CartLayout from "@/components/layouts/CartLayout.vue";
import MainPanelLayout from "@/components/layouts/MainPanelLayout.vue";
import Pikaday from "pikaday";
@Component({
  components: {MainPanelLayout, CartLayout, MainPanel}
})
export default class DashboardLayout extends Vue {



}
</script>

<style scoped lang="scss">
  @import './../../../node_modules/pikaday/css/pikaday.css';
  .dashboardLayout {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    height: 100%;
  }
</style>