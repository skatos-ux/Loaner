<template>
  <section class="cart section--1 has-text-left">
    <aside class="cart__menu menu">
      <p class="menu-label">
        Panier
      </p>
      <ul class="menu-list">
        <CartItem v-for="(item, index) in cart" :key="item.ref" :identifier="index" :name="item.name" :version="item.version" :reference="item.reference" :loanStart="item.loanStart" :loanEnd="item.loanEnd"></CartItem>
      </ul>
    </aside>
    <div class="cart__command control field has-icons-right ">
      <input @click="popModal" class="button is-success is-fullwidth is-size-6" type="button" value="Commander">
      <span class="icon is-small is-right">
          <font-awesome-icon :icon="['fas', 'shopping-cart']" />
      </span>
    </div>
    <Modal id="command" ref="modal">
      <template v-slot:header>
        <p class="modal-card-title">Cart</p>
      </template>

      <template v-slot:body>
        <CartItem v-for="(item, index) in cart" :key="item.ref" :identifier="index" :name="item.name" :version="item.version" :reference="item.reference" :loanStart="item.loanStart" :loanEnd="item.loanEnd">
          hello
        </CartItem>
      </template>
    </Modal>
  </section>
</template>

<script lang="ts">
import {Component, Prop, Ref, Vue} from 'vue-property-decorator';
import CartItem from "@/components/components/CartItem.vue";
import Modal from "@/components/components/Modal.vue";
@Component({
  components: {CartItem, Modal}
})
export default class CartLayout extends Vue {
  @Ref() readonly modal!: Modal

  cart = this.$store.state.cart.items

  popModal() {
    this.modal.popModal();
  }
}
</script>

<style scoped lang="scss">
  @import "../../scss/globals";
  .cart {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    max-width: 300px;
    min-width: 200px;
    height: 100%;
    margin: $dashboard-margin;
    padding: 0 10px 0 10px;

    &__menu {
      margin-top: 10px;
    }
    &__command {
      margin-bottom: 10px;
    }
  }
</style>