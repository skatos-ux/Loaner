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
      <DeviceCategoryLayout v-for="category in categories" :key="category.name" :title="category.name">
        <Device v-for="device in category.devices" :key="device.name" :id="device.ref" :photo="device.photo" :rank="user.rank">
          <template v-slot:name>
            {{ device.name }}
          </template>
          <template v-slot:category>
            {{ category.name }}
          </template>
          <template v-slot:ref>
            {{ device.ref }}
          </template>
          <template v-slot:version>
            {{ device.version }}
          </template>
          <template v-slot:libre>
            <span v-show="device.available" class="icon is-small success">
              <font-awesome-icon :icon="['fas', 'check']" />
            </span>
            <span v-show="!device.available" class="icon is-small fail">
              <font-awesome-icon :icon="['fas', 'times']" />
            </span>
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
  categories = this.$store.state.db.deviceCategories
  user = {
    rank: 1
  }
}
</script>

<style scoped lang="scss">
  @import "./../../scss/globals";
  .mainpanel {
    position: relative;
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
      .fail {
        color: red;
      }
      .success {
        color: green;
      }
    }
  }
</style>