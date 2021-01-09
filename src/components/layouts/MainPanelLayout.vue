<template>
  <section class="mainpanel section--1">
    <div class="mainpanel__searchbar section--1 box">
      <div class="mainpanel__searchbar--bar">
        <label>
          <input class="input is-rounded" v-model="formSearch.search" type="text" :placeholder="'Rechercher un appareil par ' + formSearch.searchMode">
        </label>
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
              <label>
                <input v-model="$v.formAddCategory.name.$model" type="text" class="input" placeholder="Ordinateurs, téléphones...">
              </label>
            </div>
            <article v-show="backCategoryUpdate" class="message is-info">
              <div class="message-body is-size-7">
                Mise à jour...
              </div>
            </article>
            <article v-show="!$v.formAddCategory.name.required" class="message is-danger">
              <div class="message-body is-size-7">
                Le nom de la catégorie est obligatoire
              </div>
            </article>
            <article v-show="backCategoryError" class="message is-danger">
              <div class="message-body is-size-7">
                {{ backCategoryErrorMsg }}
              </div>
            </article>
            <input @click="addCategory" :disabled="$v.formAddCategory.name.$invalid" class="button is-success is-fullwidth is-size-6" type="button" value="Enregistrer">
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
                  <div :class="'select' + isInputInvalid($v.formAddDevice.category.$invalid)">
                    <label>
                      <select v-model="$v.formAddDevice.category.$model" required>
                        <option selected disabled value="">Catégorie</option>
                        <option v-for="(category) in categories" :key="category.name"> {{ category.name}} </option>
                      </select>
                    </label>
                  </div>
                  <div class="icon is-small is-left">
                    <font-awesome-icon :icon="['fas', 'folder']" />
                  </div>
                </div>
              </div>
            </div>
            <div class="modal__body--wrapper">
              <label>
                <input v-model="$v.formAddDevice.name.$model" :class="'input' + isInputInvalid($v.formAddDevice.name.$invalid)" type="text" required placeholder="Nom de l'appareil">
              </label>
            </div>
            <div class="modal__body--wrapper">
              <label>
                <input v-model="$v.formAddDevice.ref.$model" :class="'input left' + isInputInvalid($v.formAddDevice.ref.$invalid)" type="text" required placeholder="Référence">
              </label>
              <label>
                <input v-model="$v.formAddDevice.version.$model" :class="'input right' + isInputInvalid($v.formAddDevice.version.$invalid)" class="input right" type="text" required placeholder="Version">
              </label>
            </div>
            <div class="modal__body--wrapper">
              <label>
                <input v-model="$v.formAddDevice.photo.$model" :class="'input left' + isInputInvalid($v.formAddDevice.photo.$invalid)" type="url" required placeholder="URL de l'image (optionnel)">
              </label>
              <label>
                <input v-model="$v.formAddDevice.phone.$model" :class="'input right' + isInputInvalid($v.formAddDevice.phone.$invalid)" type="tel" required placeholder="Numéro de téléphone (optionnel)">
              </label>
            </div>
            <article v-show="backDeviceUpdate" class="message is-info">
              <div class="message-body is-size-7">
                Mise à jour...
              </div>
            </article>
            <article v-show="$v.formAddDevice.$invalid" class="message is-danger">
              <div class="message-body is-size-7">
                Les champs saisis sont incorrects
              </div>
            </article>
            <article v-show="backDeviceError" class="message is-danger">
              <div class="message-body is-size-7">
                {{ backDeviceErrorMsg }}
              </div>
            </article>
            <input @click="addDevice" :disabled="$v.formAddDevice.$invalid" class="button is-success is-fullwidth is-size-6" type="button" value="Enregistrer">
          </template>
        </Modal>

      </div>
      <DeviceCategoryLayout v-for="category in searchedCategories" :key="category.name" :title="category.name" :categoryid="category.ID">
        <div v-if="fixSearchCategories >= 3">
          <Device v-for="device in category.devices" :key="device.name" :name="device.name" :category="category.name" :reference="device.ref" :version="device.version" :phone="device.phone" :lockDays="device.lockDays" :photo="device.photo"></Device>
        </div>
      </DeviceCategoryLayout>
    </div>
  </section>
</template>

<script lang="ts">
import {Component, Ref, Vue} from 'vue-property-decorator';
import DeviceCategoryLayout from "@/components/layouts/DeviceCategoryLayout.vue";
import Device from "@/components/components/Device.vue";
import Modal from "@/components/components/Modal.vue";

import authHeader from "@/services/auth-header";
import {required, minLength, url, numeric, maxLength} from 'vuelidate/lib/validators'

@Component({
  components: {Device, DeviceCategoryLayout, Modal},
  validations: {
    formAddCategory: {
      name: {
        required,
      }
    },
    formAddDevice: {
      name: {
        required,
      },
      category: {
        required,
      },
      ref: {
        required,
        minLength: minLength(5),
        maxLength: maxLength(5),
      },
      version: {
        required,
        minLength: minLength(3)
      },
      photo: {
        url,
      },
      phone: {
        numeric,
        maxLength: maxLength(7)
      }
    }
  }
})
export default class MainPanelLayout extends Vue {
  @Ref() readonly addCategoryModal!: Modal
  @Ref() readonly addDeviceModal!: Modal

  filters = this.$store.state.web.filters
  categories = this.$store.state.devices.categories
  user = this.$store.state.auth.user

  fixSearchCategories = 1

  backError = false
  backCategoryUpdate = false
  backDeviceUpdate = false
  backDeviceError = false
  backCategoryError = false

  backDeviceErrorMsg = ""
  backCategoryErrorMsg = ""

  formSearch = {
    search: "",
    searchMode: "nom",
  }

  formAddCategory = {
    name: ""
  }

  formAddDevice = {
    name: "",
    category: "",
    ref: "",
    version: "",
    photo: "",
    phone: ""
  }



  isInputInvalid(validator: boolean) {
    if(validator) {
      return " is-danger"
    } else {
      return ""
    }
  }

  mounted() {
    this.$api.get('/devices/all', { headers: authHeader(this.user.token) }).then((res) => {
      this.$store.dispatch('initDevices', res.data)
    }).catch((error) => {
      console.log(error.response.data)
      this.backError = true
    })
  }

  popCategoryModal() {
    this.addCategoryModal.popModal()
  }
  popDeviceModal() {
    this.addDeviceModal.popModal()
  }

  addCategory() {
    if(!this.$v.formAddCategory.name?.$invalid) {
      this.$api.put('/category/add/' + this.formAddCategory.name, {} ,{ headers: authHeader(this.user.token) }).then(() => {
        this.backCategoryError = false
        this.backCategoryUpdate = true
        setTimeout(() => {
          this.backCategoryUpdate = false
          window.location.reload()
        }, 1000)
      }).catch((error) => {
        if(error.response) {
          if(error.response.data.message === 'Category name already exists') {
            this.backCategoryError = true
            this.backCategoryErrorMsg = 'Cette catégorie existe déjà, veuillez en choisir une autre'
          } else {
            this.backError = true
          }
        } else {
          this.backError = true
        }
      })
    }
  }

  addDevice() {
    if(!this.$v.formAddDevice.$invalid) {

      this.$api.put("/devices/add", this.formAddDevice, {headers: authHeader(this.user.token)}).then(() => {
        this.backDeviceError = false
        this.backDeviceUpdate = true
        setTimeout(() => {
          this.backDeviceUpdate = false
          window.location.reload()
        }, 1000)
      }).catch((error) => {
        if(error.response) {
          if(error.response.data.message === 'Device reference is already used') {
            this.backDeviceError = true
            this.backDeviceErrorMsg = 'Cette référence existe déjà, veuillez en choisir une autre'
          } else {
            this.backError = true
          }
        } else {
          this.backError = true
        }
      })
    }
  }

  changeSearchType(event: { target: HTMLInputElement }) {
    this.formSearch.searchMode = event.target.getAttribute('value')!
  }

  get searchedCategories() {
    let search = this.formSearch.search
    let categories = this.categories

    this.fixSearchCategories++

    if(!search) {
      return categories
    }

    search = search.toLowerCase()

    if(this.formSearch.searchMode === "nom") {

      const searchedCategories: Array<any> = []
      categories.map((category: any) => {
        const test = category.devices.filter((device: any) => {
          if(device.name.toLowerCase().indexOf(search) !== -1) {
            return device
          }
        })

        if (test?.length) {
          const newCategory: any = {}
          newCategory.ID = category.ID
          newCategory.name = category.name
          newCategory.devices = test
          searchedCategories.push(newCategory)
        }
      })
      categories = searchedCategories
    }
    else if(this.formSearch.searchMode === "catégorie") {
      categories = categories.filter((category: any) => {
        if(category.name.toLowerCase().indexOf(search) !== -1) {
          return category
        }
      })
    }
    else if(this.formSearch.searchMode === "référence") {
      const searchedCategories: Array<any> = []
      categories.map((category: any) => {
        const test = category.devices.filter((device: any) => {
          if(device.ref.toLowerCase().indexOf(search) !== -1) {
            return device
          }
        })

        if (test?.length) {
          const newCategory: any = {}
          newCategory.ID = category.ID
          newCategory.name = category.name
          newCategory.devices = test
          searchedCategories.push(newCategory)
        }
      })
      categories = searchedCategories
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
          margin: 0;
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