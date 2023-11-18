import { jsonProducts } from '@/services/JsonProducts';

export function getProducts() {
  try {
    return JSON.parse(jsonProducts);
  } catch (error) {
    return {};
  }
}
