<template>
  <section class="users section--1">
    <div class="users__searchbar section--1 box">
      <input class="input is-rounded" v-model="search" type="text" placeholder="Rechercher un utilisateur">
    </div>
    <div class="users__userslist">
      <div class="users__userslist--options">
        <button @click="popUserModal" class="button  is-size-7 is-primary is-inverted">
          Ajouter utilisateur
          <span class="icon is-small">
            <font-awesome-icon :icon="['fas', 'user-plus']" />
          </span>
        </button>

        <Modal id="addUserModal" ref="addUserModal">
          <template v-slot:header>
            <p class="modal-card-title">Ajouter un utilisateur</p>
          </template>

          <template v-slot:body>
            <div class="modal__body--wrapper">
              <input type="text" class="input" placeholder="Ordinateurs, téléphones...">
            </div>
            <input @click="addUser" class="button is-success is-fullwidth is-size-6" type="button" value="Enregistrer">
          </template>
        </Modal>
      </div>
      <User v-for="user in searchedUsers" :key="user.name" :identifier="user.identifier" :name="user.name" :surname="user.surname" :role="user.role"></User>
    </div>
  </section>
</template>

<script lang="ts">
import {Component, Prop, Ref, Vue} from 'vue-property-decorator';
import Modal from "@/components/components/Modal.vue";
import Device from "@/components/components/Device.vue";
import User from "@/components/components/User.vue";

@Component({
  components: {User, Device, Modal}
})
export default class UsersLayout extends Vue {
  @Ref() readonly addUserModal!: Modal

  users = this.$store.state.db.users
  search = ""

  //TODO do dis
  popUserModal() {
    this.addUserModal.popModal()
  }

  addUser() {
    console.log("adduser")
  }

  get searchedUsers() {
    const search = this.search
    let users = this.users

    if(!search) {
      return users
    }

    users = users.filter((user: any) =>{
      if(user.name.toLowerCase().indexOf(search) !== -1) {
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