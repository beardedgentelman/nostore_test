import { FETCH_SINGLE_PRODUCT_FAILURE, FETCH_SINGLE_PRODUCT_SUCCESS } from '../actions/types'

import { makeAsyncAction } from './makeAsyncAction'

export const fetchProduct = productId => {
  return dispatch => {
    makeAsyncAction(dispatch, {
      api: async () => {
        const response = await fetch(`https://fakestoreapi.com/products/${productId}`)
        return await response.json()
      },
      successActions: [fetchProductSuccess],
      successMessage: 'Product fetched successfully',
      errorActions: [fetchProductFailure],
      errorMessage: 'Failed to fetch product'
    })
  }
}

const fetchProductSuccess = product => {
  return {
    type: FETCH_SINGLE_PRODUCT_SUCCESS,
    payload: product
  }
}

function fetchProductFailure(error) {
  return {
    type: FETCH_SINGLE_PRODUCT_FAILURE,
    payload: error
  }
}
