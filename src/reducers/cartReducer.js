import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/types'

const initialState = {
  items: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [],
  total: localStorage.getItem('total') ? JSON.parse(localStorage.getItem('total')) : 0
}

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      console.log(state)
      const existingItem = state.items.find(item => item.id === action.payload.id)
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item => (item.id === action.payload.id ? { ...item } : item))
        }
      } else {
        const newItems = [...state.items, { ...action.payload, quantity: 1 }]
        console.log(newItems)
        localStorage.setItem('cart', JSON.stringify(newItems))
        return {
          ...state,
          items: newItems,
          total: state.total + action.payload.price
        }
      }
    case REMOVE_FROM_CART:
      console.log(state)
      const updatedItems = state.items.filter(item => item.id !== action.payload)
      localStorage.setItem('cart', JSON.stringify(updatedItems))
      console.log(updatedItems)
      return {
        ...state,
        items: updatedItems
      }
    default:
      return state
  }
}
