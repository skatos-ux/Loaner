<template>
  <div class="login">
      <LoginForm/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LoginForm from "@/components/components/LoginForm.vue";
@Component({
  components: {LoginForm}
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
