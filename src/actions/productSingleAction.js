import { FETCH_SINGLE_PRODUCT_FAILURE, FETCH_SINGLE_PRODUCT_SUCCESS } from '../actions/types'

import { makeAsyncAction } from './makeAsyncAction'

export const fetchProduct = productId => {
  return dispatch => {
    return makeAsyncAction(dispatch, {
      api: async () => {
        let apiUrl = `https://fakestoreapi.com/products/${productId}`
        const response = await fetch(apiUrl)
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
