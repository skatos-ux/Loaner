export const auth = {
    state: {
        user: {
            username: null,
            rank: null
        }
    },
    mutations: {
        loginSuccess(state: any, user: any) {
            state.user.username = user.username
            state.user.rank = user.rank
        }
    },
    actions: {
        login(context: any, user: any) {
            context.commit('loginSuccess', user)
        }
    }
}