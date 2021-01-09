<template>
  <div class="device">
    <div class="device__wrapper">
      <div @click="popModal" class="device__wrapper--line">
        <div class="device__info" >{{ name }}</div>
        <div class="device__info">{{ reference }}</div>
        <div class="device__info">
          <span v-show="phone !== ''" class="is-size-6 has-text-left">
              {{ phone }}
          </span>
          <span v-show="phone === ''" class="icon is-small fail">
              <font-awesome-icon :icon="['fas', 'times']" />
          </span>
        </div>
      </div>
      <div class="device__info">
        <button @click="addToCart" :disabled="isInCart" class="button is-primary is-inverted">
          Ajouter au panier
          <span class="icon is-small">
            <font-awesome-icon :icon="['fas', 'plus']" />
          </span>
        </button>
      </div>
    </div>
    <Modal :id="reference" ref="deviceInfoModal">
      <template v-slot:header>
        <p class="modal-card-title">{{ category }}</p>
        <p class="modal-card-title">{{ name }}</p>
        <div class="modal__sim">
          <label class="label is-size-7 has-text-left">Téléphone : </label>
          <span v-show="phone !== ''" class="is-size-7 has-text-left">
              {{ phone }}
          </span>
          <span v-show="phone === ''" class="icon is-small fail">
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
        <p v-show="photo !== ''" class="image is-4by3 modal__body--wrapper">
          <img :src="photo" alt="Photo de l'appareil">
        </p>
        <article v-show="backUpdate" class="message is-info has-text-centered">
          <div class="message-body is-size-7">
            Mise à jour...
          </div>
        </article>
        <article v-show="backError" class="message is-danger has-text-centered">
          <div class="message-body is-size-7">
            Une erreur interne est survenue, veuillez réessayer dans quelques instants
          </div>
        </article>
        <div v-if="user.admin" class="modal__body--footer">
          <div class="modal__body--info">
            <input @click="deleteDevice" class="button is-danger" type="button" value="Supprimer">
          </div>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Ref, Vue} from 'vue-property-decorator';
import Modal from "@/components/components/Modal.vue";
import authHeader from "@/services/auth-header";

@Component({
  components: {Modal}
})
export default class Device extends Vue {
  @Prop() private name!: string
  @Prop() private category!: string
  @Prop() private reference!: string
  @Prop() private version!: string
  @Prop() private phone!: string
  @Prop() private lockDays!: string[]
  @Prop() private photo!: string

  @Ref() readonly deviceInfoModal!: Modal

  user = this.$store.state.auth.user
  cart = this.$store.state.cart.items

  item = {
    identifier: null,
    name: this.name,
    version: this.version,
    reference: this.reference,
    lockDays: this.lockDays,
    phone: this.phone,
  }

  backError = false
  backUpdate = false



  get isInCart() {
    for(const item of this.cart) {
      if(item.reference === this.reference) {
        return true
      }
    }
    return false
  }

  deleteDevice() {
    this.$api.delete("/devices/delete/" + this.item.reference,{ headers: authHeader(this.user.token) }).then(() => {
      this.backUpdate = true
      setTimeout(() => {
        this.backUpdate = false
        window.location.reload()
      }, 1000)
    }).catch(() => {
      this.backError = true
    })
  }
  addToCart(){
    if(!this.isInCart){
      this.$store.dispatch('addToCart', this.item)
    }
  }
  popModal() {
    this.backError = false
    this.backUpdate = false
    this.deviceInfoModal.popModal()
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
      width: 25%;
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