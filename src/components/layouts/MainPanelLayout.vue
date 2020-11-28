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
    <div class="mainpanel__devicelist">
      <DeviceCategoryLayout v-for="category in categories" :key="category.name" :title="category.name">
        <Device v-for="device in category.devices" :key="device.name" :id="device.ref">
          <template v-slot:name>
            {{ device.name }}
          </template>
          <template v-slot:ref>
            {{ device.ref }}
          </template>
          <template v-slot:libre>
            <span v-show="device.available" class="icon is-small success">
              <font-awesome-icon :icon="['fas', 'check']" />
            </span>
            <span v-show="!device.available" class="icon is-small fail">
              <font-awesome-icon :icon="['fas', 'times']" />
            </span>
          </template>
          <template v-slot:version>
            {{ device.version }}
          </template>
          <template v-slot:photo>
            {{ device.photo }}
          </template>
        </Device>
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
  categories = this.$store.state.web.deviceCategories
}
</script>

<style scoped lang="scss">
  @import "../../scss/globals";
  .dashboard__mainpanel {
    flex-grow: 2;
    height: calc(100% - 20px);
    display: flex;
    flex-direction: column;
    margin: 10px;
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
      .fail {
        color: red;
      }
      .success {
        color: green;
      }
    }
  }
</style>