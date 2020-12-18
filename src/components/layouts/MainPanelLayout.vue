<template>
  <section class="mainpanel section--1">
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
    <div class="mainpanel__devicelist">
      <DeviceCategoryLayout v-for="(category, index) in categories" :key="category.name" :title="category.name">
        <Device v-for="device in category.devices" :key="device.name" :name="device.name" :category="category.name" :reference="device.ref" :version="device.version" :sim="device.sim" :available="device.available" :photo="device.photo" :rank="user.rank" :pikaday="index * 2"></Device>
      </DeviceCategoryLayout>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import DeviceCategoryLayout from "@/components/layouts/DeviceCategoryLayout.vue";
import Device from "@/components/components/Device.vue";
@Component({
  components: {Device, DeviceCategoryLayout}
})
export default class MainPanelLayout extends Vue {
  filters = this.$store.state.web.filters
  categories = this.$store.state.db.deviceCategories
  user = this.$store.state.auth.user
}
</script>

<style scoped lang="scss">
  @import "./../../scss/globals";
  .mainpanel {
    width: 100%;
    height: 100%;
    flex-grow: 2;
    display: flex;
    flex-direction: column;
    margin: $dashboard-margin;
    &__searchbar {
      margin: 5px;
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