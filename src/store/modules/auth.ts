export const auth = {
    state: {
        user: {
            firstName: null,
            lastName: null,
            admin: false,
            logged: false,
            token: null
        }
    },
    mutations: {
        loginSuccess(state: any, user: any) {
            state.user.firstName = user.firstName
            state.user.lastName = user.lastName
            if(user.admin === 1) {
                state.user.admin = true
            } else {
                state.user.admin = false
            }
            state.user.token = user.token
            state.user.logged = true
        }
    },
    actions: {
        login(context: any, user: any) {
            context.commit('loginSuccess', user)
        }
    }
}