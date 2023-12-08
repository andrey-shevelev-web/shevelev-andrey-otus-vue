import { jsonProducts } from '@/services/JsonProducts';
import api from '@/services/api';
import apiEcho from '@/services/apiEcho';

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

export async function postOrderForm(formData) {
  const response = await apiEcho.post('/post', {
    params: { formData }
  });
  return response.data;
}
