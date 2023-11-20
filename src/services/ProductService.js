import { jsonProducts } from '@/services/JsonProducts';
import api from '@/services/api';

export function getProductsFromJson() {
  try {
    return JSON.parse(jsonProducts);
  } catch (error) {
    return {};
  }
}

export async function getProducts() {
  const response = await api.get('/products');
  return response.data;
}
