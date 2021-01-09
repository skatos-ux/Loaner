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

  popModal() {
    const inputId = document.getElementById(this.id)
    if(inputId) {
      inputId.className += " is-active"
    }
  }

  depopModal() {
    const inputId = document.getElementById(this.id)
    if(inputId) {
      inputId.classList.remove("is-active")
    }
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
      align-items: center;
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
    &--footer {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
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
      margin-bottom: 0;
      margin-right: 3px;
      line-height: 24px;
    }
  }
}
</style>