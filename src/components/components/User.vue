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
          <span @click="remUser" class="icon is-small">
            <font-awesome-icon :icon="['fas', 'trash-alt']" />
          </span>
      </div>
    </div>
    <Modal :id="identifier" ref="userAddModal">
      <template v-slot:header>
        <p class="modal-card-title">Historique</p>
      </template>

      <template v-slot:body>
        temp
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Ref, Vue} from 'vue-property-decorator';
import Modal from "@/components/components/Modal.vue";

@Component({
  components: {Modal}
})
export default class User extends Vue {
  @Ref() readonly userAddModal!: Modal

  @Prop() private identifier!: string
  @Prop() private firstName!: string
  @Prop() private lastName!: string
  @Prop() private email!: string
  @Prop() private admin!: boolean


  popModal() {
    this.userAddModal.popModal()
  }

  remUser() {
    console.log("remUser")
    /*
    this.$api.post("/login", this.form).then((res) => {
      console.log(res.data)
    }).catch((error) => {
      console.log(error)
      element.preventDefault()
    })
    */
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
      color: red;
      vertical-align: middle;
    }
  }
}

</style>