<template>
  <div class="dashboard">
    <CartComponent/>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import CartComponent from "@/components/components/CartComponent.vue";
@Component({
  components: {CartComponent}
})
export default class Dashboard extends Vue {

}
</script>

<style scoped lang="scss">

</style>