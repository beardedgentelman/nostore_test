import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/types'

const initialState = {
  items: [],
  total: 0
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
        return {
          ...state,
          items: [...state.items, { ...action.payload, quantity: 1 }],
          total: state.total + action.payload.price
        }
      }
    case REMOVE_FROM_CART:
      const itemToRemove = state.items.find(item => item.id === action.payload.id)
      if (itemToRemove.quantity === 1) {
        return {
          ...state,
          items: state.items.filter(item => item.id !== action.payload.id),
          total: state.total - itemToRemove.price
        }
      } else {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id ? { ...item, quantity: item.quantity - 1 } : item
          ),
          total: state.total - itemToRemove.price
        }
      }
    default:
      return state
  }
}
