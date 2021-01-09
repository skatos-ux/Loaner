<template>
  <div class="users">
    <UsersLayout/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import UsersLayout from "@/components/layouts/UsersLayout.vue";
@Component({
  components: {UsersLayout}
})
export default class Users extends Vue {

}
</script>

<style scoped lang="scss">
  .users {
    height: 100%;
  }
</style>