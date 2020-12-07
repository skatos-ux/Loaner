<template>
  <div class="device">
    <div class="device__wrapper">
      <div @click="popModal" class="device__wrapper--line">
        <div class="device__info" >{{ name }}</div>
        <div class="device__info">{{ reference }}</div>
        <div class="device__info">
          <span v-show="available" class="icon is-small success">
              <font-awesome-icon :icon="['fas', 'check']" />
          </span>
          <span v-show="!available" class="icon is-small fail">
              <font-awesome-icon :icon="['fas', 'times']" />
          </span>
        </div>
      </div>
      <div class="device__info">
        <button :disabled="!available" class="button button--iconl is-primary is-inverted">
          Ajouter au panier
          <span class="icon is-small">
              <font-awesome-icon :icon="['fas', 'plus']" />
          </span>
        </button>
      </div>
    </div>
    <Modal :id="reference" ref="modal">
      <template v-slot:header>
        <p class="modal-card-title">{{ category }}</p>
        <p class="modal-card-title">{{ name }}</p>
        <div class="modal__sim">
          <label class="label is-size-7 has-text-left	">SIM:</label>
          <span v-show="available" class="icon is-small success">
              <font-awesome-icon :icon="['fas', 'check']" />
            </span>
          <span v-show="!available" class="icon is-small fail">
              <font-awesome-icon :icon="['fas', 'times']" />
          </span>
        </div>
      </template>

      <template v-slot:body>
        <div class="modal__body--wrapper">
          <div class="modal__body--info">{{ name }}</div>
          <div class="modal__body--info">{{ version }}</div>
          <div class="modal__body--info">{{ reference }}</div>
        </div>
        <p class="image is-4by3">
          <img :src="photo" alt="">
        </p>
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Ref, Emit, Vue} from 'vue-property-decorator';
import Modal from "@/components/components/Modal.vue";
@Component({
  components: {Modal}
})
export default class Device extends Vue {
  @Prop() private name!: string
  @Prop() private category!: string
  @Prop() private reference!: string
  @Prop() private version!: string
  @Prop() private available!: boolean
  @Prop() private photo!: string
  @Prop() private rank!: number

  @Ref() readonly modal!: Modal

  currentTime = "2017-06-01 08:30"
  /*
  newItemAdded(e: { target: HTMLInputElement }) {
    const category = e.target.
  }
  */
  @Emit()
  addToCart(category: string, device: string) {
    return category.concat(device)
  }
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
        line-height: 40px;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
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
        margin-left: 5px !important;
      }
      .fail {
        color: red;
      }
      .success {
        color: green;
      }
    }
  }
</style>