<template>
  <div class="register">
    <RegisterForm/>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import RegisterForm from "@/components/components/RegisterForm.vue";
@Component({
  components: {RegisterForm}
})
export default class Register extends Vue {
}
</script>

<style scoped lang="scss">
  .register {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
</style>