import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { jsonProducts } from "@/services/JsonProducts";
import * as ProductService from "@/services/ProductService";
import { setActivePinia, createPinia } from "pinia";

import component from "@/components/MainHeader.vue";
vi.mock("@/services/ProductService");
vi.mock("primevue/usetoast");

import * as toast from "primevue/usetoast";

describe("MainHeader", () => {
  const mockProducts = JSON.parse(jsonProducts);
  beforeEach(() => {
    toast.useToast = vi.fn().mockImplementation(() => ({ add: vi.fn() }));

    setActivePinia(createPinia());
    ProductService.getProducts = vi.fn().mockResolvedValue(mockProducts);
  });

  it("mounts without error", () => {
    const wrapper = mount(component, {
      global: {
        stubs: ["Toast", "router-link"],
      },
    });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
