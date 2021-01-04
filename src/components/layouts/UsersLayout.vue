<template>
  <section class="users section--1">
    <div class="users__searchbar section--1 box">
      <input class="input is-rounded" v-model="search" type="text" placeholder="Rechercher un nom de famille">
    </div>
    <article v-show="backError" class="message is-danger">
      <div class="message-body is-size-7">
        Une erreur interne est survenue, veuillez réessayer dans quelques instants
      </div>
    </article>
    <div class="users__userslist">
      <div class="users__userslist--options">
        <button @click="popUserModal" class="button  is-size-7 is-primary is-inverted">
          Ajouter un administrateur
          <span class="icon is-small">
            <font-awesome-icon :icon="['fas', 'user-plus']" />
          </span>
        </button>

        <Modal id="addAdminModal" ref="addAdminModal">
          <template v-slot:header>
            <p class="modal-card-title">Ajouter un administrateur</p>
          </template>

          <template v-slot:body>
            <div class="modal__body--wrapper">
              <input v-model="formAddAdmin.firstName" type="text" class="input left" placeholder="Prénom">
              <input v-model="formAddAdmin.lastName" type="text" class="input middle" placeholder="Nom">
              <input v-model="formAddAdmin.email" type="email" class="input right" placeholder="Email">
            </div>
            <input @click="addAdmin" class="button is-success is-fullwidth is-size-6" type="button" value="Enregistrer">
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

@Component({
  components: {User, Device, Modal}
})
export default class UsersLayout extends Vue {
  @Ref() readonly addAdminModal!: Modal

  users = []
  search = ""

  formAddAdmin = {
    firstName: "",
    lastName: "",
    email: "",
    admin: true,
    temporaryPassword: true
  }

  backError = false

  popUserModal() {
    this.addAdminModal.popModal()
  }

  mounted() {
    this.$api.get('/users/all').then((res) => {
      this.users = res.data
    }).catch((error) => {
      this.backError = true
      console.log(error)
    })
  }

  addAdmin() {
    console.log(this.formAddAdmin)

    this.$api.post('/users/add', this.formAddAdmin).then((res) => {
      console.log(res.data)
    }).catch((error) => {
      this.backError = true
      console.log(error)
    })

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