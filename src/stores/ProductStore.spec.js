import { describe, test, expect, vi } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { jsonProducts } from '@/services/JsonProducts'
import * as ProductService from '@/services/ProductService'
import { useProductStore } from '@/stores/ProductStore';

vi.mock('@/services/ProductService') 

describe("Product store", () => {
  const mockProducts = JSON.parse(jsonProducts)
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  test('store is empty initially', () => {
    const store = useProductStore();
    expect(store.products).toHaveLength(0);
  })
  test('loadProducts works as expected', async () => {
    const store = useProductStore();
    ProductService.getProducts = vi.fn().mockResolvedValue(mockProducts)
    await  store.loadProducts()
    expect(store.products).toEqual(mockProducts);
    expect(ProductService.getProducts).toHaveBeenCalled()
  })
  test('filteredProducts works as expected for price', async () => {
    const store = useProductStore();
    ProductService.getProducts = vi.fn().mockResolvedValue(mockProducts)
    await  store.loadProducts()
    store.setProductsFilter(64)
    expect(store.filteredProducts).toHaveLength(1);
  })
  test('filteredProducts works as expected for title', async () => {
    const store = useProductStore();
    ProductService.getProducts = vi.fn().mockResolvedValue(mockProducts)
    await  store.loadProducts()
    store.setProductsFilter('Gold')
    expect(store.filteredProducts).toHaveLength(4);
  })
});
