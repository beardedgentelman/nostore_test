const BASE_URL = 'https://fakestoreapi.com'

export const getAllProducts = () => {
  return fetch(`${BASE_URL}/products`).then(res => res.json())
}

export const getProductById = id => {
  return fetch(`${BASE_URL}/products/${id}`).then(res => res.json())
}
