import { describe, it, expect, vi } from 'vitest';
import * as subject from '@/services/ProductService';
import { jsonProducts } from '@/services/JsonProducts';
import api from '@/services/api';

describe('ProductService', () => {
  const mockProducts = JSON.parse(jsonProducts);

  it('imported without errors', () => {
    expect(subject).toBeDefined();
    expect(typeof subject).toBe('object');
  });

  it('request backend and fetch data', async () => {
    api.get = vi.fn().mockResolvedValue({ status: 200, data: mockProducts });

    const products = await subject.getProducts();
    expect(products).toEqual(mockProducts);
    expect(api.get).toBeCalledTimes(1);
  });
});
