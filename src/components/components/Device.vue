<template>
  <div class="device">
    <div @click="popModal" class="device__wrapper">
      <div class="device__wrapper--line">
        <div class="device__info" ><slot name="name"></slot></div>
        <div class="device__info"><slot name="ref"></slot></div>
        <div class="device__info"><slot name="libre"></slot></div>
      </div>
      <div class="device__info--command field">
        <div class="control">
          <input class="input" type="datetime-local">
        </div>
      </div>
    </div>
    <Modal :id="this.id" :photo="this.photo" :rank="rank" ref="modal">
      <template v-slot:name>
        <slot name="name"></slot>
      </template>
      <template v-slot:category>
        <slot name="category"></slot>
      </template>
      <template v-slot:version>
        <slot name="ref"></slot>
      </template>
      <template v-slot:ref>
        <slot name="ref"></slot>
      </template>
      <template v-slot:libre>
        <slot name="libre"></slot>
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Ref, Vue} from 'vue-property-decorator';
import Modal from "@/components/components/Modal.vue";
@Component({
  components: {Modal}
})
export default class Device extends Vue {
  @Prop() private id!: string
  @Prop() private photo!: string
  @Prop() private rank!: number

  @Ref() readonly modal!: Modal

  popModal() {
    this.modal.popModal()
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
      align-items: center;
      margin-bottom: 10px;
      padding: 3px 0 3px 0;
      flex-grow: 2;
      transition: background-color ease 200ms;
      border-radius: 4px;
      &--line {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        padding: 3px 0 3px 0;
        flex-grow: 2;
      }
      &:hover {
        cursor: pointer;
        background-color: grey;
      }
    }
    &__info {
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
</style>