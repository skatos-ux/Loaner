<template>
  <div class="device">
    <div class="device__info">name</div>
    <div class="device__info">ref</div>
    <div class="device__info">libre</div>
    <div class="device__info">commande</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Device extends Vue {

}
</script>

<style scoped lang="scss">
  @import "./../../scss/globals";
  .device {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: flex-start;
    margin-bottom: 10px;
    &:hover {
      cursor: pointer;
      background-color: grey;
    }
  }
</style>