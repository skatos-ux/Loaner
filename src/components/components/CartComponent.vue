<template>

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class NavBar extends Vue {
  @Prop() private test!: string;
}
</script>

<style scoped lang="scss">

</style>