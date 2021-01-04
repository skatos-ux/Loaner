<template>
  <section class="mainpanel section--1">
    <div class="mainpanel__searchbar section--1 box">
      <div class="mainpanel__searchbar--bar">
        <input class="input is-rounded" v-model="formSearch.search" type="text" :placeholder="'Rechercher un appareil par ' + formSearch.searchMode">
      </div>
      <div class="mainpanel__searchbar--filters">
        <div v-for="filter in filters" :key="filter.name" class="field">
          <label class="radio filter label is-size-7 has-text-left">
            <input @click="changeSearchType" :checked="filter.auto" type="radio" name="filter" :value="filter.name">
            {{ filter.name }}
          </label>
        </div>
      </div>
      <article v-show="backError" class="message is-danger">
        <div class="message-body is-size-7">
          Une erreur interne est survenue, veuillez réessayer dans quelques instants
        </div>
      </article>
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
            </div>
            <div class="modal__body--wrapper">
              <input v-model="formAddDevice.name" id="deviceName" class="input" type="text" required placeholder="Nom de l'appareil">
            </div>
            <div class="modal__body--wrapper">
              <input v-model="formAddDevice.reference" id="deviceRef" class="input left" type="text" required placeholder="Référence">
              <input v-model="formAddDevice.version" id="deviceVer" class="input right" type="text" required placeholder="Version">
            </div>
            <div class="modal__body--wrapper">
              <input v-model="formAddDevice.photo" id="devicePhoto" class="input left" type="url" required placeholder="URL de l'image">
              <input v-model="formAddDevice.phone" id="devicePhone" class="input right" type="tel" required placeholder="Numéro de téléphone">
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

import authHeader from "@/services/auth-header";

@Component({
  components: {Device, DeviceCategoryLayout, Modal}
})
export default class MainPanelLayout extends Vue {
  @Ref() readonly addCategoryModal!: Modal
  @Ref() readonly addDeviceModal!: Modal

  filters = this.$store.state.web.filters
  categories = this.$store.state.db.deviceCategories
  user = this.$store.state.auth.user

  formSearch = {
    search: "",
    searchMode: "nom",
  }

  backError = false

  formAddCategory = {
    name: ""
  }

  formAddDevice = {
    name: "",
    category: "",
    reference: "",
    version: "",
    photo: "",
    phone: ""
  }

  mounted() {
    this.$api.get('/devices/all').then((res) => {
      console.log(res.data)
    }).catch((error) => {
      console.log(error)
    })

    this.$api.get('/category/all').then((res) => {
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
    this.$api.put('/category/add/' + this.formAddCategory.name, {} ,{ headers: authHeader(this.user.token) }).then((res) => {
      console.log(res.data)
    }).catch((error) => {
      this.backError = true
    })
  }

  addDevice() {
    this.$api.post("/devices/add", this.formAddDevice).then((res) => {
      console.log(res)
    }).catch((error) => {
      this.backError = true
      console.log(error)
    })
  }

  changeSearchType(event: { target: HTMLInputElement }) {
    this.formSearch.searchMode = event.target.getAttribute('value')!
  }

  get searchedCategories() {
    let search = this.formSearch.search
    let categories = this.categories



    if(!search) {
      return categories
    }

    search = search.toLowerCase()

    if(this.formSearch.searchMode === "nom") {
      categories = categories.filter((category: any) =>{
        const test = category.devices.filter((device: any) => {
          if(device.name.toLowerCase().indexOf(search) !== -1) {
            return device
          }
        })
        if (test?.length) {
          return test
        }
      })
    }
    else if(this.formSearch.searchMode === "catégorie") {
      categories = categories.filter((category: any) => {
        if(category.name.toLowerCase().indexOf(search) !== -1) {
          return category
        }
      })
    }
    else if(this.formSearch.searchMode === "référence") {
      categories = categories.filter((category: any) =>{
        const test = category.devices.filter((device: any) => {
          if(device.ref.toLowerCase().indexOf(search) !== -1) {
            return device
          }
        })
        if (test?.length) {
          return test
        }
      })
    }

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