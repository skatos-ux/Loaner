<template>
  <section class="cart section--1 has-text-left">
    <aside class="cart__menu menu">
      <p class="menu-label">
        Category1
      </p>
      <ul class="menu-list">
        <CartItem v-for="item in cart" :key="item.ref" :identifier="item.index" :name="item.name" :version="item.version" :reference="item.reference" :loanStart="item.loanStart" :loanEnd="item.loanEnd"></CartItem>
      </ul>
    </aside>
    <div class="cart__command control field has-icons-right ">
      <input class="button is-success is-fullwidth is-size-6" type="button" value="Commander">
      <span class="icon is-small is-right">
          <font-awesome-icon :icon="['fas', 'shopping-cart']" />
      </span>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import CartItem from "@/components/components/CartItem.vue";
@Component({
  components: {CartItem}
})
export default class CartLayout extends Vue {
  cart = this.$store.state.cart.items
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