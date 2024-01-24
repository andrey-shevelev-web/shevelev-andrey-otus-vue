import { describe, it, expect, vi, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { jsonProducts } from '@/services/JsonProducts';
import * as ProductService from '@/services/ProductService';
import { useProductStore } from '@/stores/ProductStore';

vi.mock('@/services/ProductService');

describe('ProductStore', () => {
  const mockProducts = JSON.parse(jsonProducts);

  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('initial store is empty', () => {
    const store = useProductStore();
    expect(store.products).toHaveLength(0);
  });

  it('loadProducts works as expected', async () => {
    ProductService.getProducts = vi.fn().mockResolvedValue(mockProducts);
    const store = useProductStore();
    await store.loadProducts();
    expect(store.products).toEqual(mockProducts);
    expect(ProductService.getProducts).toHaveBeenCalled();
  });
});
