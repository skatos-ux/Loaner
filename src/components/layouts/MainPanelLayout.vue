<template>
  <section class="dashboard__mainpanel section--1">
    <div class="mainpanel__searchbar section--1 box">
      <div class="mainpanel__searchbar--bar">
        <input class="input is-rounded" type="text" placeholder="Rechercher un appareil">
      </div>
      <div class="mainpanel__searchbar--filters">
        <div v-for="filter in filters" :key="filter.name" class="field">
          <label class="filter label is-size-7 has-text-left">
            <input type="checkbox">
            {{  filter.name }}
          </label>
        </div>
      </div>
    </div>
    <section class="mainpanel__devicelist section--1">
      <DeviceCategoryLayout v-for="category in categories" :key="category.name" :title="category.name"/>
    </section>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import DeviceCategoryLayout from "@/components/layouts/DeviceCategoryLayout.vue";
@Component({
  components: {DeviceCategoryLayout}
})
export default class MainPanelLayout extends Vue {
  filters = this.$store.state.web.filters
  categories = this.$store.state.web.deviceCategories
}
</script>

<style scoped lang="scss">
  @import "../../scss/globals";
  .dashboard__mainpanel {
    position: relative;
    flex-grow: 2;
    height: 100%;
    display: flex;
    flex-direction: column;
    margin: 0 10px 0 10px;
  }
  .mainpanel {
    &__searchbar {
      margin: 5px;
      &--search {

      }
      &--filters {
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: flex-start;
        margin-top: 1.25rem;
        .field {
          margin: 0px;
        }
        .filter {
          margin-right: 1.25rem;
        }
      }
    }
    &__devicelist {
      margin: 5px;
      overflow: auto;
    }
  }
</style>