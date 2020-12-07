export const auth = {
    state: {
        user: {
            username: null,
            rank: null,
            logged: false
        }
    },
    mutations: {
        loginSuccess(state: any, user: any) {
            state.user.username = user.username
            state.user.rank = user.rank
            state.user.logged = true
        }
    },
    actions: {
        login(context: any, user: any) {
            context.commit('loginSuccess', user)
        }
    }
}