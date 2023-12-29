interface CartItem {
  id: number
  name: string
  price: number
  totalPrice: number
  count: number
}
interface InputItem {
  id: number
  name: string
  price: number
  count: number
}
export const useCartStore = defineStore('cart', () => {
  const cart = ref<CartItem[]>([])
  const addToCart = (item: InputItem) => {
    const index = cart.value?.length > 0 ? cart.value.findIndex((v) => v.id === item.id) : -1
    if (index > -1) {
      cart.value[index].count += item.count
      cart.value[index].totalPrice = cart.value[index].count * item.price
    } else {
      cart.value.push(
        JSON.parse(
          JSON.stringify({
            id: item.id,
            name: item.name,
            price: item.price,
            totalPrice: item.price * item.count,
            count: item.count
          })
        )
      )
    }
  }
  const removeToCart = (item: InputItem) => {
    const index = cart.value?.length > 0 ? cart.value.findIndex((v) => v.id === item.id) : -1
    if (index > -1) {
      cart.value[index].count = cart.value[index].count - item.count
      cart.value[index].totalPrice = cart.value[index].count * item.price
      if (cart.value[index].count === 0) {
        cart.value.splice(index, 1)
      }
    }
  }
  const clearCart = () => {
    cart.value = []
  }
  const total = computed(() => {
    return cart.value.reduce((sum, item) => sum + item.price, 0)
  })
  const count = computed(() => {
    return cart.value.reduce((sum, item) => sum + item.count, 0)
  })
  return { cart, total, count, addToCart, removeToCart, clearCart }
})
