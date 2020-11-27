<template>
  <div class="login">
      <LoginComponent/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LoginComponent from "@/components/components/LoginComponent.vue";
@Component({
  components: {LoginComponent}
})
export default class Login extends Vue {

}

</script>
<style scoped lang="scss">
  .login {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
</style>
