export const devices = {
    state: {
        categories: []
    },
    mutations: {
        initDevices(state: any, categories: any) {
            state.categories = categories
        },
    },
    actions: {
        initDevices(context: any, categories: any) {
            context.commit('initDevices', categories)
        }
    }
}