<template>
  <div class="deviceCategory has-text-left">
    <h5 class="title is-5">{{ title }}</h5>
    <div class="devicesCategory__container">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Device from "@/components/components/Device.vue";
@Component({
  components: {Device}
})
export default class DeviceCategoryLayout extends Vue {
  @Prop() private title!: string;
}
</script>

<style scoped lang="scss">
@import "./../../scss/globals";
  .deviceCategory {
    padding: 1.25rem;
    &--container {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
  }
</style>