<template>
  <section class="cart section--1 has-text-left">
    <aside class="cart__menu menu">
      <p class="menu-label">
        Panier
      </p>
      <ul class="menu-list">
        <CartItem v-for="(item, index) in cart" :key="item.ref" :identifier="index" :name="item.name" :version="item.version" :reference="item.reference"></CartItem>
      </ul>
    </aside>
    <div class="cart__command control field has-icons-right ">
      <input :disabled="checkEmpty" @click="popModal" class="button is-success is-fullwidth is-size-6" type="button" value="Commander">
      <span class="icon is-small is-right">
          <font-awesome-icon :icon="['fas', 'shopping-cart']" />
      </span>
    </div>
    <Modal id="command" ref="commandModal">
      <template v-slot:header>
        <p class="modal-card-title">Cart</p>
      </template>

      <template v-slot:body>
        <CartItem v-for="(item, index) in cart" :key="item.ref" :identifier="index" :name="item.name" :version="item.version" :reference="item.reference">
          <div class="cart__modal--item">
            {{ item.name }}
            <label>
              <input :id="'datepicker' + index" class="input" type="text" required placeholder="date de réservation">
            </label>
          </div>
        </CartItem>
        <article v-show="backSuccess" class="message is-success">
          <div class="message-body is-size-7">
            Votre commande à bien été effectuée vous allez être redirigé vers la page d'acceuil
          </div>
        </article>
        <article v-show="fixValidation < litepickers.length" class="message is-danger">
          <div class="message-body is-size-7">
            Des champs requis sont manquants, veuillez les completer
          </div>
        </article>
        <article v-show="backError" class="message is-danger">
          <div class="message-body is-size-7">
            Une erreur interne est survenue, veuillez réessayer dans quelques instants
          </div>
        </article>
        <input :disabled="fixValidation < litepickers.length" @click="command" class="button is-success is-fullwidth is-size-6" type="button" value="Commander">
      </template>
    </Modal>
  </section>
</template>

<script lang="ts">
import {Component, Ref, Vue} from 'vue-property-decorator';
import CartItem from "@/components/components/CartItem.vue";
import Modal from "@/components/components/Modal.vue";
import Litepicker from 'litepicker';


import authHeader from "@/services/auth-header";
import { required } from "vuelidate/lib/validators";

@Component({
  components: {CartItem, Modal},
  validations: {
    cart: {
      required,
      $each: {
        loanDays: {
          required,
        }
      }
    }
  }
})
export default class CartLayout extends Vue {
  @Ref() readonly commandModal!: Modal

  cart = this.$store.state.cart.items
  user = this.$store.state.auth.user

  litepickers: Array<Litepicker> = []

  fixValidation = 0

  backError = false
  backSuccess = false

  get checkEmpty () {
    return !this.cart.length;
  }

  popModal() {
    this.commandModal.popModal();

    this.backSuccess = false
    this.backError = false

    this.litepickers.map((litepicker: Litepicker) => {
      litepicker.destroy()
    })

    this.litepickers.length = 0

    this.cart.forEach((item: any, index: number) => {
      item.loanDays = []
      // noinspection JSUnusedGlobalSymbols
      this.litepickers.push(new Litepicker({
        element: document.getElementById("datepicker" + index),
        format: "D MMMM YYYY",
        lang: "fr-FR",
        numberOfMonths: 2,
        numberOfColumns: 2,
        minDate: new Date(),
        singleMode: false,
        lockDays: item.lockDays,
        disallowLockDaysInRange: true,
        onSelect: (startDate: Date, endDate: Date) => {
          item.loanDays = this.datesToString(startDate, endDate)
          this.fixValidation++
        }
      }));
    });
  }

  datesToString(startDate: Date, endDate: Date) {

    const startDateYear = startDate.getFullYear()
    const startDateMonths = startDate.getMonth() + 1
    const startDateDay = startDate.getDate()

    const startDateString = [startDateYear,
      (startDateMonths>9 ? '' : '0') + startDateMonths,
      (startDateDay>9 ? '' : '0') + startDateDay
    ].join('-');

    const endDateYear = endDate.getFullYear()
    const endDateMonths = endDate.getMonth() + 1
    const endDateDay = endDate.getDate()

    const endDateString = [endDateYear,
      (endDateMonths>9 ? '' : '0') + endDateMonths,
      (endDateDay>9 ? '' : '0') + endDateDay
    ].join('-');

    return [startDateString, endDateString]

  }

  command() {
    this.$api.post("/devices/borrow/" + this.user.id, { commands: this.cart }, { headers: authHeader(this.user.token) }).then(() => {
      this.backSuccess = true
      setTimeout(() => {
        window.location.reload()
      }, 5000)
    }).catch(() => {
      this.backError = true
    })

    setTimeout(() => {
      this.$store.dispatch('clearCart')
      window.location.reload()
    }, 4500)
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

    &__modal {
      &--item {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
        input {
          max-width: 305px;
          flex-grow: 2;
        }
      }
      &--footer {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        input {
          max-width: 305px;
        }
      }
    }
    &__menu {
      margin-top: 10px;
    }
    &__command {
      margin-bottom: 10px;
    }
  }
</style>