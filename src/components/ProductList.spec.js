import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';

import { setActivePinia, createPinia } from 'pinia';
import { jsonProducts } from '@/services/JsonProducts';
import * as ProductService from '@/services/ProductService';
import { useProductStore } from '@/stores/ProductStore';
import component from '@/components/ProductList.vue';

vi.mock('@/services/ProductService');
vi.mock('primevue/usetoast');

describe('ProductList', () => {
  beforeEach(async () => {
    const mockProducts = JSON.parse(jsonProducts);
    setActivePinia(createPinia());

    ProductService.getProducts = vi.fn().mockResolvedValue(mockProducts);
    const store = useProductStore();
    await store.loadProducts();
  });

  it('mounts without errors', async () => {
    const wrapper = mount(component, {
      global: {
        stubs: ['toast']
      }
    });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
