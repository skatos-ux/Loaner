<template>
  <div @mouseover="hover = true" @mouseleave="hover = false" class="deviceCategory has-text-left">
    <div class="deviceCategory__header">
      <h5 class="title is-5">{{ title }}</h5>

      <span v-if="user.admin" v-show="hover" @click="remCategory" class="icon is-small is-pointer fail">
        <font-awesome-icon  :icon="['fas', 'trash-alt']" />
      </span>
      <span v-if="loading" v-show="hover" class="icon is-small is-pointer success">
        <font-awesome-icon spin :icon="['fas', 'cog']" />
      </span>
    </div>
    <div class="deviceCategory__container">
      <article v-show="backError" class="message is-danger">
        <div class="message-body is-size-7">
          Une erreur interne est survenue, veuillez réessayer dans quelques instants
        </div>
      </article>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Device from "@/components/components/Device.vue";
import authHeader from "@/services/auth-header";
@Component({
  components: {Device}
})
export default class DeviceCategoryLayout extends Vue {
  @Prop() private title!: string;
  @Prop() private categoryid!: number;

  user = this.$store.state.auth.user
  hover = false
  loading = false

  backError = false

  remCategory() {
    this.loading = true

    this.$api.delete('/category/delete/' + this.categoryid,{ headers: authHeader(this.user.token) }).then(() => {

      this.$api.get('/devices/all', { headers: authHeader(this.user.token) }).then((res) => {
        this.$store.dispatch('initDevices', res.data)
      }).catch(() => {
        this.backError = true
      })
      this.loading = true
      setTimeout(() => {
        this.loading = false
        window.location.reload()
      }, 1000)
    }).catch(() => {
      this.backError = true
    })
  }


}
</script>

<style scoped lang="scss">
@import "./../../scss/globals";
  .deviceCategory {
    padding: 1.25rem;
    &__header {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      justify-content: flex-start;
      span {
        margin-left: 10px;
        display: inline;
        vertical-align: middle;
      }
    }
  }
</style>