<template>
  <tr>
    <th>{{ reservationId }}</th>
    <th>{{ idDevice }}</th>
    <th>{{ startDate }}, {{ endDate }}</th>
  </tr>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class HistoryItem extends Vue {
  @Prop() private reservationId!: number
  @Prop() private idDevice!: string
  @Prop() private loanDates!: string[]

  startDate = this.loanDates[0]
  endDate = this.loanDates[1]

  mounted() {
    if(this.loanDates[3]) {
      this.endDate = this.loanDates[3]
    }
  }

}
</script>

<style scoped lang="scss">

</style>