<script setup>
import { reactive } from 'vue';
import InputText from 'primevue/inputtext';
import InputMask from 'primevue/inputmask';
import Checkbox from 'primevue/checkbox';
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import { useForm } from 'vee-validate';
import { postOrderForm } from '@/services/ProductService';

const emit = defineEmits();

function required(value) {
  return value ? true : 'This field is required';
}

function requiredObjectValue(value) {
  return value?.value ? true : 'This field is required';
}

const {
  defineInputBinds,
  handleSubmit,
  resetForm,
  errors: validationErrors
} = useForm({
  validationSchema: {
    firstname: required,
    surname: required,
    city: requiredObjectValue,
    street: required,
    house: required,
    cardOwner: required,
    cardNumber: required,
    agreeWithRules: required
  }
});

const firstname = defineInputBinds('firstname');
const surname = defineInputBinds('surname');
const city = defineInputBinds('city');
const street = defineInputBinds('street');
const house = defineInputBinds('house');
const cardOwner = defineInputBinds('cardOwner');
const cardNumber = defineInputBinds('cardNumber');
const agreeWithRules = defineInputBinds('agreeWithRules');

const cities = reactive([
  { name: 'Москва', code: 'MSK' },
  { name: 'Санкт Петербург', code: 'SP' },
  { name: 'Новосибирск', code: 'NSK' },
  { name: 'Екатеринбург', code: 'EKB' },
  { name: 'Казань', code: 'KZN' },
  { name: 'Нижний Новгород', code: 'NND' },
  { name: 'Красноярск', code: 'KSK' },
  { name: 'Челябинск', code: 'TCH' },
  { name: 'Уфа', code: 'UF' },
  { name: 'Ростов-на-Дону', code: 'RND' }
]);

const onSubmit = handleSubmit(async values => {
  const { firstname, surname, city, street, house, cardOwner, cardNumber } =
    values;

  const formData = {
    firstname,
    surname,
    city: city.value,
    street,
    house,
    cardOwner,
    cardNumber
  };

  const response = await postOrderForm(formData);
  emit('orderFormSubmitted');
  emit('setHiddenOrderForm', true);
});
</script>

<template>
  <div
    class="px-4 py-8 md:px-6 lg:px-8 flex align-items-center justify-content-center"
  >
    <div class="surface-card p-4 shadow-2 border-round w-full lg:w-4">
      <form @submit.prevent="onSubmit">
        <div class="flex justify-content-between">
          <div class="mb-3">
            <label for="firstname-o1" class="block text-900 font-medium mb-2"
              >Name</label
            >
            <InputText
              id="firstname-o1"
              type="text"
              v-bind="firstname"
              placeholder="Name"
              :class="{ 'p-invalid': validationErrors.firstname }"
            />
            <small class="p-error">{{
              validationErrors.firstname || '&nbsp;'
            }}</small>
          </div>

          <div class="mb-3">
            <label for="surname-o1" class="block text-900 font-medium mb-2"
              >Surname</label
            >
            <InputText
              id="surname-o1"
              type="text"
              v-bind="surname"
              placeholder="Surname"
              :class="{ 'p-invalid': validationErrors.surname }"
            />
            <small class="p-error">{{
              validationErrors.surname || '&nbsp;'
            }}</small>
          </div>
        </div>

        <div class="mb-3">
          <label for="city-o1" class="block text-900 font-medium mb-2"
            >City / Town</label
          >
          <Dropdown
            id="city-o1"
            type="text"
            v-bind="city"
            v-model="modelValue"
            :options="cities"
            optionLabel="name"
            optionValue="code"
            placeholder="City / Town"
            class="w-full"
            :class="{ 'p-invalid': validationErrors.surname }"
          />
          <small class="p-error">{{ validationErrors.city || '&nbsp;' }}</small>
        </div>

        <div class="flex justify-content-between">
          <div class="mb-3">
            <label for="street-o1" class="block text-900 font-medium mb-2"
              >Street</label
            >
            <InputText
              id="street-o1"
              type="text"
              v-bind="street"
              placeholder="Street"
              :class="{ 'p-invalid': validationErrors.street }"
            />
            <small class="p-error">{{
              validationErrors.street || '&nbsp;'
            }}</small>
          </div>

          <div class="mb-3">
            <label for="house-o1" class="block text-900 font-medium mb-2"
              >House</label
            >
            <InputText
              id="house-o1"
              type="text"
              v-bind="house"
              placeholder="House"
              :class="{ 'p-invalid': validationErrors.house }"
            />
            <small class="p-error">{{
              validationErrors.house || '&nbsp;'
            }}</small>
          </div>
        </div>

        <div class="flex justify-content-between">
          <div class="mb-3">
            <label for="card-owner-o1" class="block text-900 font-medium mb-2"
              >Card Owner</label
            >
            <InputText
              id="card-owner-o1"
              type="text"
              v-bind="cardOwner"
              placeholder="Card Owner"
              :class="{ 'p-invalid': validationErrors.cardOwner }"
            />
            <small class="p-error">{{
              validationErrors.cardOwner || '&nbsp;'
            }}</small>
          </div>

          <div class="mb-3">
            <label for="card-number-o1" class="block text-900 font-medium mb-2"
              >Card Number</label
            >
            <InputMask
              id="card-number-o1"
              v-bind="cardNumber"
              v-model="modelValue"
              mask="9999-9999-9999-9999"
              placeholder="Card Number"
              :class="{ 'p-invalid': validationErrors.cardNumber }"
            />
            <small class="p-error">{{
              validationErrors.cardNumber || '&nbsp;'
            }}</small>
          </div>
        </div>

        <div class="flex align-items-center mb-5">
          <Checkbox
            id="agree-with-rules-o1"
            v-bind="agreeWithRules"
            v-model="agreeWithRules.value"
            binary
            :class="{ 'p-invalid': validationErrors.agreeWithRules }"
          />
          <label
            for="agree-with-rules-o1"
            class="block text-900 font-medium ml-2"
            >I agree with the order processing rules</label
          >
          <small class="p-error">{{
            validationErrors.agreeWithRules || '&nbsp;'
          }}</small>
        </div>

        <div
          class="flex flex-wrap justify-content-between align-content-center"
        >
          <Button
            label="Cancel"
            icon="pi pi-times"
            class="w-5"
            severity="danger"
            @click="$emit('setHiddenOrderForm', true)"
          ></Button>
          <Button
            label="Send order"
            icon="pi pi-file-export"
            class="w-5"
            type="submit"
          ></Button>
        </div>
      </form>
    </div>
  </div>
</template>
