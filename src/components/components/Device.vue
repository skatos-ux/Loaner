<template>
  <div class="device">
    <div @click="popModal" class="device__wrapper">
      <div class="device__info" ><slot name="name"></slot></div>
      <div class="device__info"><slot name="ref"></slot></div>
      <div class="device__info"><slot name="libre"></slot></div>
      <div class="device__info">commande</div>
    </div>
    <div :id="id" class="modal device__modal">
      <div class="modal-background device__modal--background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title"><slot name="name"></slot></p>
          <div class="device__modal--sim">
            <label class="label is-size-7 has-text-left	">SIM:</label>
            <slot name="libre"></slot></div>
          <button @click="depopModal" class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
          <div class="device__modal--body">
            <div class="device__modal--wrapper">
              <div class="device__info"><slot name="name"></slot></div>
              <div class="device__info"><slot name="version"></slot></div>
              <div class="device__info"><slot name="ref"></slot></div>
            </div>
            <p class="image is-4by3">
              <img src="https://bulma.io/images/placeholders/1280x960.png" alt="">
            </p>
          </div>
        </section>
      </div>
    </div>
  </div>

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Device extends Vue {
  @Prop() private id!: string
  popModal() {
    document.getElementById(this.id)!.className += " is-active"
  }
  depopModal() {
    document.getElementById(this.id)!.classList.remove("is-active")
  }

}
</script>

<style scoped lang="scss">
  @import "./../../scss/globals";
  .device {
    &__wrapper {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: flex-start;
      margin-bottom: 10px;
      padding: 3px 0 3px 0;
      transition: background-color ease 200ms;
      border-radius: 4px;
      &:hover {
        cursor: pointer;
        background-color: grey;
      }
    }
    &__modal {
      position: absolute;
      width: 100vw;
      height: 100vh;
      top: 0;
      left: 0;
      z-index: 10;
      &--background {
        position: absolute;
        width: 100vw;
        height: 100vh;
        top: 0;
        left: 0;
      }
      &--body {
        display: flex;
        flex-direction: column;
      }
      &--wrapper {
        display: flex;
        justify-content: space-around;
        align-items: flex-start;
        margin: 0 0 20px 0;
      }
      &--sim {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-right: 10px;
        label {
          margin-bottom: 0px;
          margin-right: 3px;
          line-height: 24px;
        }
      }
    }
    &__info {
      span {
        display: table-cell;
        vertical-align: middle;
      }
    }
  }
</style>