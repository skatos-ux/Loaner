<template>
  <div :id="this.id" class="modal">
    <div class="modal-background modal__background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <slot name="header"></slot>
        <button @click="depopModal" class="delete" aria-label="close"></button>
      </header>
      <section class="modal-card-body">
        <div class="modal__body">
          <slot name="body"></slot>
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

  //TODO: change refs to slots to allow different types of modals for the "Add to cart" modal

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

    .fail {
      color: red;
    }
    .success {
      color: green;
    }

    label {
      margin-bottom: 0px;
      margin-right: 3px;
      line-height: 24px;
    }
  }
}
</style>