export const cart = {
    state: {
        items: [
        ]
    },
    mutations: {
        addItem(state: any, item: any) {
            item.identifier = state.items.length
            state.items.push(item)
        },
        remItem(state: any, item: any) {
            state.items.splice(item.identifier, 1)
        }
    },
    actions: {
        addToCart(context: any, item: any) {
            context.commit('addItem', item)
        },
        remFromCart(context: any, item: any) {
            context.commit('remItem', item)
        }
    }
}