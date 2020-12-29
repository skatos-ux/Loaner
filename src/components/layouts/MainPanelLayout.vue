<template>
  <section class="mainpanel section--1">
    <div class="mainpanel__searchbar section--1 box">
      <div class="mainpanel__searchbar--bar">
        <input class="input is-rounded" v-model="search" type="text" placeholder="Rechercher une catégorie">
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
      <div v-if="user.admin" class="mainpanel__devicelist--options">
        <button @click="popCategoryModal" class="button  is-size-7 is-primary is-inverted">
          Ajouter categorie
        <span class="icon is-small">
            <font-awesome-icon :icon="['fas', 'folder-plus']" />
          </span>
        </button>
        <button @click="popDeviceModal" class="button is-size-7 is-primary is-inverted">
          Ajouter appareil
          <span class="icon is-small">
            <font-awesome-icon :icon="['fas', 'plus-square']" />
          </span>
        </button>
        <Modal id="addCatModal" ref="addCategoryModal">
          <template v-slot:header>
            <p class="modal-card-title">Ajouter une catégorie</p>
          </template>

          <template v-slot:body>
            <div class="modal__body--wrapper">
              <input v-model="formAddCategory.name" type="text" class="input" placeholder="Ordinateurs, téléphones...">
            </div>
            <input @click="addCategory" class="button is-success is-fullwidth is-size-6" type="button" value="Enregistrer">
          </template>
        </Modal>
        <Modal id="addDevModal" ref="addDeviceModal">
          <template v-slot:header>
            <p class="modal-card-title">Ajouter un appareil</p>
          </template>

          <template v-slot:body>

            <div class="modal__body--wrapper">
              <div class="field">
                <div class="control has-icons-left">
                  <div class="select">
                    <select>
                      <option v-for="category in categories" :key="category.name"> {{ category.name}} </option>
                    </select>
                  </div>
                  <div class="icon is-small is-left">
                    <font-awesome-icon :icon="['fas', 'folder']" />
                  </div>
                </div>
              </div>
              <input v-model="formAddDevice.name" id="deviceName" class="input" type="text" required placeholder="Nom de l'appareil">
              <input v-model="formAddDevice.reference" id="deviceRef" class="input" type="text" required placeholder="Référence">
              <input v-model="formAddDevice.version" id="deviceVer" class="input" type="text" required placeholder="Version">
            </div>
            <div class="modal__body--wrapper">
              <input id="devicePhoto" class="input" type="file" accept="image/x-png,image/jpeg" required placeholder="Image" value="test">
              <input v-model="formAddDevice.phone" id="devicePhone" class="input" type="tel" required placeholder="Numéro de téléphone">
            </div>
            <input @click="addDevice" class="button is-success is-fullwidth is-size-6" type="button" value="Enregistrer">
          </template>
        </Modal>

      </div>
      <DeviceCategoryLayout v-for="category in searchedCategories" :key="category.name" :title="category.name">
        <Device v-for="device in category.devices" :key="device.name" :name="device.name" :category="category.name" :reference="device.ref" :version="device.version" :phone="device.phone" :lockDays="device.lockDays" :photo="device.photo"></Device>
      </DeviceCategoryLayout>
    </div>
  </section>
</template>

<script lang="ts">
import {Component, Prop, Ref, Vue} from 'vue-property-decorator';
import DeviceCategoryLayout from "@/components/layouts/DeviceCategoryLayout.vue";
import Device from "@/components/components/Device.vue";
import Modal from "@/components/components/Modal.vue";
@Component({
  components: {Device, DeviceCategoryLayout, Modal}
})
export default class MainPanelLayout extends Vue {
  @Ref() readonly addCategoryModal!: Modal
  @Ref() readonly addDeviceModal!: Modal

  filters = this.$store.state.web.filters
  categories = this.$store.state.db.deviceCategories
  user = this.$store.state.auth.user
  search = ""

  formAddCategory = {
    name: ""
  }

  formAddDevice = {
    name: "",
    reference: "",
    version: 1.0,
    photo: "",
    phone: ""
  }

  mounted() {
    this.$api.get('/devices/all').then((res) => {
      console.log(res.data)
    }).catch((error) => {
      console.log(error)
    })
  }

  popCategoryModal() {
    this.addCategoryModal.popModal()
  }
  popDeviceModal() {
    this.addDeviceModal.popModal()
  }

  addCategory() {
    console.log("add category")
    /*
    this.$api.post("/login", this.form).then((res) => {
      console.log(res.data)
    }).catch((error) => {
      console.log(error)
      element.preventDefault()
    })
    */
  }

  addDevice() {
    console.log("add device")
    /*
    this.$api.post("/login", this.form).then((res) => {
      console.log(res.data)
    }).catch((error) => {
      console.log(error)
      element.preventDefault()
    })
    */
  }

  get searchedCategories() {
    let search = this.search
    let categories = this.categories

    if(!search) {
      return categories
    }

    search = search.toLowerCase()
    categories = categories.filter((category: any) =>{
      if(category.name.toLowerCase().indexOf(search) !== -1) {
        return category
      }
    })

    return categories

  }
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
      &--options {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        margin-right: 30px;
        button {
          margin-left: 10px;
          margin-top: 5px;
          &:focus {
            box-shadow: none !important;
          }
          span {
            display: table-cell;
            vertical-align: middle;
            margin-left: 5px !important;
          }
        }
      }
    }
  }
</style>