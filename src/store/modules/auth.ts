import {mapState} from "vuex";

export const auth = {
    state: {
        user: {
            id: null,
            firstName: null,
            lastName: null,
            email: null,
            admin: false,
            token: null,
            temporaryPassword: null,
            logged: false,
        }
    },
    mutations: {
        loginSuccess(state: any, user: any) {
            state.user.id = user.id
            state.user.firstName = user.firstName
            state.user.lastName = user.lastName
            state.user.email = user.email
            state.user.admin = user.admin
            state.user.token = user.token
            state.user.temporaryPassword = user.temporaryPassword
            state.user.logged = true
        }
    },
    actions: {
        login(context: any, user: any) {
            context.commit('loginSuccess', user)
        }
    }
}