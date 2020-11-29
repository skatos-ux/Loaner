<template>
  <div :id="id" class="modal">
    <div class="modal-background modal__background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title"><slot name="name"></slot></p>
        <p class="modal-card-title"><slot name="category"></slot></p>
        <div class="modal__sim">
          <label class="label is-size-7 has-text-left	">SIM:</label>
          <slot name="libre"></slot>
        </div>
        <button @click="depopModal" class="delete" aria-label="close"></button>
      </header>
      <section class="modal-card-body">
        <div class="modal__body">
          <div class="modal__body--wrapper">
            <div class="modal__body--info"><slot name="name"></slot></div>
            <div class="modal__body--info"><slot name="version"></slot></div>
            <div class="modal__body--info"><slot name="ref"></slot></div>
          </div>
          <p class="image is-4by3">
            <img :src="this.photo" alt="">
          </p>
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Modal extends Vue {
  @Prop() private id!: string
  @Prop() private photo!: string
  @Prop() private rank!: number

  public popModal(): any {
    document.getElementById(this.id)!.className += " is-active"
  }

  depopModal(): any {
    document.getElementById(this.id)!.classList.remove("is-active")
  }
}
</script>

<style scoped lang="scss">
.modal {
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 10;

  &__background {
    position: absolute;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
  }

  &__body {
    display: flex;
    flex-direction: column;
    &--wrapper {
      display: flex;
      justify-content: space-around;
      align-items: flex-start;
      margin: 0 0 20px 0;
    }
    &--info {
      margin-right: 10px;
      span {
        display: table-cell;
        vertical-align: middle;
      }
      &--command {
        position: relative;
        flex-grow: 1;
        z-index: 2;
        max-width: 300px;
      }
    }
  }

  &__sim {
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
</style>