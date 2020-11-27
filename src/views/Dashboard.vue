<template>
  <div class="dashboard">
    <MainPanelLayout/>
    <CartComponent/>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import CartComponent from "@/components/components/CartComponent.vue";
import MainPanelLayout from "@/components/layouts/MainPanelLayout.vue";
@Component({
  components: {MainPanelLayout, CartComponent}
})
export default class Dashboard extends Vue {

}
</script>

<style scoped lang="scss">
  .dashboard {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    padding: 10px 0 10px 0;
  }
</style>