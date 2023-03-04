import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/types'

const initialState = {
  items: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
  total: localStorage.getItem('cartTotal') ? JSON.parse(localStorage.getItem('cartTotal')) : 0
}

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const existingItem = state.items.find(item => item.id === action.payload.id)
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item => (item.id === action.payload.id ? { ...item } : item))
        }
      } else {
        const newItems = [...state.items, { ...action.payload, quantity: 1 }]
        localStorage.setItem('cart', JSON.stringify(newItems))
        return {
          ...state,
          items: newItems,
          total: state.total + action.payload.price
        }
      }
    case REMOVE_FROM_CART:
      const itemToRemove = state.items.find(item => item.id === action.payload.id)
      if (itemToRemove.quantity === 1) {
        const newItems = state.items.filter(item => item.id !== action.payload.id)
        localStorage.setItem('cart', JSON.stringify(newItems))
        return {
          ...state,
          items: newItems,
          total: state.total - itemToRemove.price
        }
      } else {
        const newItems = state.items.map(item =>
          item.id === action.payload.id ? { ...item, quantity: item.quantity - 1 } : item
        )
        localStorage.setItem('cart', JSON.stringify(newItems))
        return {
          ...state,
          items: newItems,
          total: state.total - itemToRemove.price
        }
      }
    default:
      return state
  }
}
