const BASE_URL = 'https://fakestoreapi.com'

export const getAllProducts = () => {
  return `${BASE_URL}/products`
}

export const getProductById = id => {
  return `${BASE_URL}/products/${id}`
}
