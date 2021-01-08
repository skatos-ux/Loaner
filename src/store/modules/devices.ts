export const devices = {
    state: {
        categories: []
    },
    mutations: {
        initDevices(state: any, categories: any) {

            state.categories.length = 0

            categories.map((category: any) => {
                state.categories.push(category)
            })
        },
    },
    actions: {
        initDevices(context: any, categories: any) {
            context.commit('initDevices', categories)
        }
    }
}