<template>
  <div class="verify">
    <PassChangeForm />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import PassChangeForm from "@/components/components/PassChangeForm.vue";
@Component({
  components: {PassChangeForm}
})
export default class Verify extends Vue {
}
</script>

<style scoped lang="scss">
.verify {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
</style>