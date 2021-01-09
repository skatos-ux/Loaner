<template>
  <section class="users section--1">
    <div class="users__searchbar section--1 box">
      <label>
        <input class="input is-rounded" v-model="search" type="text" placeholder="Rechercher un nom de famille">
      </label>
    </div>
    <article v-show="backError" class="message is-danger">
      <div class="message-body is-size-7">
        Une erreur interne est survenue, veuillez réessayer dans quelques instants
      </div>
    </article>
    <div class="users__userslist">
      <div class="users__userslist--options">
        <button @click="popUserModal" class="button  is-size-7 is-primary is-inverted">
          Ajouter un utilisateur
          <span class="icon is-small">
            <font-awesome-icon :icon="['fas', 'user-plus']" />
          </span>
        </button>

        <Modal id="addAdminModal" ref="addAdminModal">
          <template v-slot:header>
            <p class="modal-card-title">Ajouter un utilisateur</p>
          </template>

          <template v-slot:body>
            <div class="modal__body--wrapper">
              <label>
                <input v-model="$v.formAddUser.id.$model" type="text" :class="'input left' + isInputInvalid($v.formAddUser.id.$invalid)" placeholder="Matricule">
              </label>
              <label>
                <input v-model="$v.formAddUser.firstName.$model" type="text" :class="'input middle' + isInputInvalid($v.formAddUser.firstName.$invalid)" placeholder="Prénom">
              </label>
              <label>
                <input v-model="$v.formAddUser.lastName.$model" type="text" :class="'input middle' + isInputInvalid($v.formAddUser.lastName.$invalid)" placeholder="Nom">
              </label>
              <label>
                <input v-model="$v.formAddUser.email.$model" type="email" :class="'input middle' + isInputInvalid($v.formAddUser.email.$invalid)" placeholder="Email">
              </label>
              <input v-model="$v.formAddUser.admin.$model" id="switchExample" type="checkbox" class="switch right">
              <label for="switchExample" class="middle">Administrateur</label>
            </div>
            <article v-show="backUserAddedSuccess" class="message is-success">
              <div class="message-body is-size-7">
                L'utilisateur à été ajouté avec succès son mot de passe est : {{ temporaryPassword }}
              </div>
            </article>
            <article v-show="backUpdate" class="message is-info">
              <div class="message-body is-size-7">
                Mise à jour...
              </div>
            </article>
            <article v-show="$v.formAddUser.$invalid" class="message is-danger">
              <div class="message-body is-size-7">
                Les champs saisis sont incorrects
              </div>
            </article>
            <article v-show="backUserAddedError" class="message is-danger">
              <div class="message-body is-size-7">
                {{ errorMsg }}
              </div>
            </article>
            <input @click="addUser" :disabled="$v.formAddUser.$invalid" class="button is-success is-fullwidth is-size-6" type="button" value="Enregistrer">
          </template>
        </Modal>
      </div>
      <User v-for="user in searchedUsers" :key="user.name" :identifier="user.id" :firstName="user.firstName" :lastName="user.lastName" :email="user.email" :admin="user.admin"></User>
    </div>
  </section>
</template>

<script lang="ts">
import {Component, Ref, Vue} from 'vue-property-decorator';
import Modal from "@/components/components/Modal.vue";
import Device from "@/components/components/Device.vue";
import User from "@/components/components/User.vue";

import authHeader from "@/services/auth-header";
import {required, alpha, email, alphaNum, minLength, maxLength} from 'vuelidate/lib/validators'

@Component({
  components: {User, Device, Modal},
  validations: {
    formAddUser: {
      id: {
        required,
        alphaNum,
        minLength: minLength(7),
        maxLength: maxLength(7)
      },
      firstName: {
        required,
        alpha
      },
      lastName: {
        required,
        alpha
      },
      email: {
        required,
        email
      },
      admin: {
        required
      }
    }
  }
})
export default class UsersLayout extends Vue {
  @Ref() readonly addAdminModal!: Modal

  user = this.$store.state.auth.user

  users = []
  search = ""

  backUserAddedSuccess = false
  backUserAddedError = false


  backUpdate = false
  backError = false
  errorMsg = ""


  temporaryPassword = ""

  formAddUser = {
    id: null,
    firstName: "",
    lastName: "",
    email: "",
    admin: false,
    temporaryPassword: true
  }


  popUserModal() {
    this.addAdminModal.popModal()
  }

  mounted() {
    this.$api.get('/users/all', { headers: authHeader(this.user.token) }).then((res) => {
      this.users = res.data
    }).catch(() => {
      this.backError = true
    })
  }

  isInputInvalid(validator: boolean) {
    if(validator) {
      return " is-danger"
    } else {
      return ""
    }
  }

  addUser() {
    console.log(this.formAddUser)
    if(!this.$v.formAddUser.$invalid) {
      this.$api.put('/users/add', this.formAddUser, { headers: authHeader(this.user.token) }).then((res) => {
        this.$api.get('/users/all', { headers: authHeader(this.user.token) }).then((res) => {
          this.users = res.data
        }).catch(() => {
          this.backError = true
        })

        this.backUpdate = true


        setTimeout(() => {
          this.temporaryPassword = res.data.password
          this.backUpdate = false
          this.backUserAddedSuccess = true
        }, 1000)
      }).catch((error) => {
        console.log(error.response.data)
        if(error.response) {
          if(error.response.data.message === "User with this ID already exists") {
            this.backUserAddedError = true
            this.errorMsg = "Un utilisateur existe déjà avec ce matricule, veuillez en choisir un autre"
          }
          else if(error.response.data.message === "User with this email already exists"){
            this.backUserAddedError = true
            this.errorMsg = "Un utilisateur existe déjà avec cet email, veuillez en choisir un autre"
          }
        }
        else {
          this.backError = true
        }
      })
    }
  }

  get searchedUsers() {
    let search = this.search
    let users = this.users

    if(!search) {
      return users
    }

    search = search.toLowerCase()

    users = users.filter((user: any) =>{
      if(user.lastName.toLowerCase().indexOf(search) !== -1) {
        return user
      }
    })
    return users
  }

}
</script>

<style scoped lang="scss">
  .users {
    margin: 10px;
    &__userslist--options {
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
</style>