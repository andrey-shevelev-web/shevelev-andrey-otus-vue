import { describe, it, expect } from "vitest";
import * as testSubject from '@/services/ProductService'
import { jsonProducts } from '@/services/JsonProducts'
import api from '@/services/api';


describe('ProductService', () => {
  const mockProducts = JSON.parse(jsonProducts)
  it('imports without errors', () => {
    expect(testSubject).toBeDefined()
    expect(testSubject).toBeTypeOf('object')
    expect(testSubject.getProducts).toBeTypeOf('function')
  })

  it('requests backend when called', async () => {
    api.get = vi.fn().mockResolvedValue({data: mockProducts})
    const products = await testSubject.getProducts()
    expect(products).toEqual(mockProducts)
    expect(api.get).toHaveBeenCalled()
  })
})
