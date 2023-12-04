import { ref, reactive, computed } from 'vue';
import { defineStore } from 'pinia';
import { v4 as uuidv4 } from 'uuid';
import { getProducts } from '@/services/ProductService';

export const useProductStore = defineStore('productStore', () => {
  const products = reactive([]);
  const isRequestRunning = ref(false);
  const requestError = ref('');
  const isVisibleCreateForm = ref(false);
  const productsFilter = ref('');

  const clearProducts = () => {
    products.splice(0, products.length);
  };

  const loadProducts = async () => {
    requestError.value = '';
    isRequestRunning.value = true;
    try {
      const responseData = await getProducts();
      clearProducts();
      products.push(...responseData);
    } catch (err) {
      requestError.value = 'Error! There was an error loading products';
    } finally {
      isRequestRunning.value = false;
    }
  };

  const setProductsFilter = value => {
    console.log('store value', value);
    productsFilter.value = value;
  };

  const filteredProducts = computed(() => {
    const rawFilter = productsFilter.value;

    if (rawFilter) {
      const priceFilter = Number(rawFilter);

      return products.filter(
        o =>
          o.title.includes(rawFilter) ||
          (!isNaN(priceFilter) && o.price === priceFilter)
      );
    } else {
      return products;
    }
  });

  const setVisibleCreateForm = value => {
    isVisibleCreateForm.value = value;
  };

  const createProduct = (title, category, description, price) => {
    const newProduct = {
      id: uuidv4(),
      title,
      category,
      description,
      price,
      image:
        'https://mir-baget.com/upload/iblock/b9b/nibxd6dvjqm4yv24tzzsvvv6y7w1rhzd.png',
      rating: {
        rate: 0,
        count: 0
      }
    };
    products.unshift(newProduct);
    setVisibleCreateForm(false);
  };

  return {
    products,
    loadProducts,
    productsFilter,
    setProductsFilter,
    filteredProducts,
    isRequestRunning,
    requestError,
    createProduct,
    isVisibleCreateForm,
    setVisibleCreateForm
  };
});
