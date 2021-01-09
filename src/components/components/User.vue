<template>
  <div class="user">
    <div class="user__wrapper">
      <div @click="popModal" class="user__wrapper--line">
        <div class="user__info" >{{ identifier }}</div>
        <div class="user__info">{{ firstName }}</div>
        <div class="user__info">{{ lastName }}</div>
        <div class="user__info">{{ email }}</div>
      </div>

      <div class="user__info">
        <span v-if="user.id !== identifier" @click="remUser" class="icon is-small is-pointer fail">
          <font-awesome-icon :icon="['fas', 'trash-alt']" />
        </span>
        <span v-show="loading" class="icon is-small is-pointer success">
          <font-awesome-icon spin :icon="['fas', 'cog']" />
        </span>
      </div>
    </div>
    <article v-show="backError" class="message is-danger">
      <div class="message-body is-size-7">
        Une erreur interne est survenue lors de la suppression de l'utilisateur, veuillez réessayer dans quelques instants
      </div>
    </article>
    <Modal :id="identifier" ref="userInfoModal">
      <template v-slot:header>
        <p class="modal-card-title">Historique</p>
      </template>

      <template v-slot:body>
        <table class="table">
          <thead>
            <tr>
              <th>Référence</th>
              <th>Référence de l'appareil</th>
              <th>Dates d'emprunts</th>
            </tr>
          </thead>
          <tbody>
            <HistoryItem v-for="reservation in reservations" :key="reservation.id" :reservation-id="reservation.ID" :id-device="reservation.refDevice" :loan-dates="[reservation.startDate, reservation.endDate, reservation.returnDate]" />
          </tbody>
        </table>
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Ref, Vue} from 'vue-property-decorator';
import Modal from "@/components/components/Modal.vue";
import authHeader from "@/services/auth-header";
import HistoryItem from "@/components/components/HistoryItem.vue";

@Component({
  components: {HistoryItem, Modal}
})
export default class User extends Vue {
  @Ref() readonly userInfoModal!: Modal

  @Prop() private identifier!: string
  @Prop() private firstName!: string
  @Prop() private lastName!: string
  @Prop() private email!: string
  @Prop() private admin!: boolean

  user = this.$store.state.auth.user

  loading = false

  backError = false

  reservations = []

  popModal() {

    this.$api.get("/users/" + this.identifier + "/history", { headers: authHeader(this.user.token) }).then((res) => {
      this.reservations = res.data

    }).catch(() => {
      this.loading = false
      this.backError = true
    })

    this.userInfoModal.popModal()
  }

  remUser() {
    this.$api.delete("/users/delete/" + this.identifier, { headers: authHeader(this.user.token) }).then(() => {
      this.loading = true

      setTimeout(() => {
        this.loading = false
        window.location.reload()
      }, 1000)

    }).catch(() => {
      this.loading = false
      this.backError = true
    })
  }
}
</script>

<style scoped lang="scss">

.user {
  &__wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 3px 0 3px 0;
    flex-grow: 2;
    transition: background-color ease 200ms;
    border-radius: 4px;
    margin: 3px 6px 10px 6px;
    &--line {
      display: flex;
      line-height: 40px;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      flex-grow: 2;
    }
    &:hover {
      cursor: pointer;
      background-color: grey;
    }
  }
  &__info {
    width: 25%;
    margin-right: 10px;
    span {
      display: inline;
      vertical-align: middle;
      margin-left: 5px;
    }
  }
}

</style>