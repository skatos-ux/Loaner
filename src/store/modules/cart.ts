export const cart = {
    state: {
        items: [
            {ref: "item1"}
        ]
    },
    mutations: {
        addItem(state: any, item: any) {
            state.items.push(item)
        }
    },
    actions: {
        addToCart(context: any, item: any) {
            context.commit('addItem', item)
        }
    }
}