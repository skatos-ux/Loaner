<template>
  <div>
    <slot>
      <li>
        <a class="control has-icons-right fail--hover">
          {{ name }}
          <span @click="remFromCart" class="icon is-small is-right test">
            <font-awesome-icon :icon="['fas', 'trash-alt']" />
          </span>
        </a>
      </li>
    </slot>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class CartItem extends Vue {
  @Prop() private identifier!: number;
  @Prop() private name!: string;
  @Prop() private version!: string;
  @Prop() private reference!: string;
  @Prop() private loanStart: number | undefined;
  @Prop() private loanEnd: number | undefined;

  item = {
    identifier: this.identifier,
    name: this.name,
    version: this.version,
    reference: this.reference,
    loanStart: this.loanStart,
    loanEnd: this.loanEnd
  }

  remFromCart() {
    this.$store.dispatch('remFromCart', this.item)
  }


}
</script>

<style scoped lang="scss">
  @import "./../../scss/globals";
</style>