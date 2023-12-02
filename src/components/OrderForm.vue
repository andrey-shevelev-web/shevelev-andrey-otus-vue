<script setup>
import InputText from 'primevue/inputtext';
import InputMask from 'primevue/inputmask';
import Checkbox from 'primevue/checkbox';
import Button from 'primevue/button';
import { useForm } from 'vee-validate';
import { useRouter } from 'vue-router';
import { postOrderForm } from '@/services/ProductService';

const emit = defineEmits();
const router = useRouter();

const emptyValidation = fieldName => value => {
  return value ? true : `${fieldName} required`;
};

const agreeWithRulesValidation = value => {
  const notValidText = 'Your consent to the order processing rules is required';
  return value ? true : notValidText;
};

const {
  handleSubmit,
  defineField,
  resetForm,
  errors: validationErrors
} = useForm({
  validationSchema: {
    firstname: emptyValidation('First name'),
    surname: emptyValidation('Surname'),
    city: emptyValidation('City'),
    street: emptyValidation('Street'),
    house: emptyValidation('House'),
    cardOwner: emptyValidation('Card owner'),
    cardNumber: emptyValidation('Card number'),
    agreeWithRules: agreeWithRulesValidation
  }
});

const [firstname, firstnameAttrs] = defineField('firstname');
const [surname, surnameAttrs] = defineField('surname');
const [city, cityAttrs] = defineField('city');
const [street, streetAttrs] = defineField('street');
const [house, houseAttrs] = defineField('house');
const [cardOwner, cardOwnerAttrs] = defineField('cardOwner');
const [cardNumber, cardNumberAttrs] = defineField('cardNumber');
const [agreeWithRules, agreeWithRulesAttrs] = defineField('agreeWithRules');

const onRouteTo = name => {
  router.push({ name });
};

const onSubmit = handleSubmit(async values => {
  const { firstname, surname, city, street, house, cardOwner, cardNumber } =
    values;

  const formData = {
    firstname,
    surname,
    city,
    street,
    house,
    cardOwner,
    cardNumber
  };

  const response = await postOrderForm(formData);
  resetForm();
  localStorage.setItem('cart', JSON.stringify(''));
  onRouteTo('ProductList');
});
</script>

<template>
  <div
    class="px-4 py-8 md:px-6 lg:px-8 flex align-items-center justify-content-center"
  >
    <div class="surface-card p-4 shadow-2 border-round w-full lg:w-4">
      <form @submit.prevent="onSubmit">
        <div class="mb-2">
          <label for="firstname-o1" class="block text-900 font-medium mb-1"
            >Name</label
          >
          <InputText
            id="firstname-o1"
            type="text"
            v-model="firstname"
            v-bind="firstnameAttrs"
            placeholder="Name"
            class="w-full"
            :class="{ 'p-invalid': validationErrors.firstname }"
          />
          <small class="p-error">{{
            validationErrors.firstname || '&nbsp;'
          }}</small>
        </div>

        <div class="mb-2">
          <label for="surname-o1" class="block text-900 font-medium mb-1"
            >Surname</label
          >
          <InputText
            id="surname-o1"
            type="text"
            v-model="surname"
            v-bind="surnameAttrs"
            placeholder="Surname"
            class="w-full"
            :class="{ 'p-invalid': validationErrors.surname }"
          />
          <small class="p-error">{{
            validationErrors.surname || '&nbsp;'
          }}</small>
        </div>

        <div class="mb-2">
          <label for="city-o1" class="block text-900 font-medium mb-1"
            >City / Town</label
          >
          <InputText
            id="city-o1"
            type="text"
            v-model="city"
            v-bind="cityAttrs"
            placeholder="City / Town"
            class="w-full"
            :class="{ 'p-invalid': validationErrors.surname }"
          />
          <small class="p-error">{{ validationErrors.city || '&nbsp;' }}</small>
        </div>

        <div class="mb-2">
          <label for="street-o1" class="block text-900 font-medium mb-1"
            >Street</label
          >
          <InputText
            id="street-o1"
            type="text"
            v-model="street"
            v-bind="streetAttrs"
            placeholder="Street"
            class="w-full"
            :class="{ 'p-invalid': validationErrors.street }"
          />
          <small class="p-error">{{
            validationErrors.street || '&nbsp;'
          }}</small>
        </div>

        <div class="mb-2">
          <label for="house-o1" class="block text-900 font-medium mb-1"
            >House</label
          >
          <InputText
            id="house-o1"
            type="text"
            v-model="house"
            v-bind="houseAttrs"
            placeholder="House"
            class="w-full"
            :class="{ 'p-invalid': validationErrors.house }"
          />
          <small class="p-error">{{
            validationErrors.house || '&nbsp;'
          }}</small>
        </div>

        <div class="mb-2">
          <label for="card-owner-o1" class="block text-900 font-medium mb-1"
            >Card Owner</label
          >
          <InputText
            id="card-owner-o1"
            type="text"
            v-model="cardOwner"
            v-bind="cardOwnerAttrs"
            placeholder="Card Owner"
            class="w-full"
            :class="{ 'p-invalid': validationErrors.cardOwner }"
          />
          <small class="p-error">{{
            validationErrors.cardOwner || '&nbsp;'
          }}</small>
        </div>

        <div class="mb-2">
          <label for="card-number-o1" class="block text-900 font-medium mb-1"
            >Card Number</label
          >
          <InputMask
            id="card-number-o1"
            v-model="cardNumber"
            v-bind="cardNumberAttrs"
            mask="9999-9999-9999-9999"
            placeholder="Card Number"
            class="w-full"
            :class="{ 'p-invalid': validationErrors.cardNumber }"
          />
          <small class="p-error">{{
            validationErrors.cardNumber || '&nbsp;'
          }}</small>
        </div>

        <div class="flex align-items-center mb-5">
          <Checkbox
            id="agree-with-rules-o1"
            v-model="agreeWithRules"
            v-bind="agreeWithRulesAttrs"
            binary
            :class="{ 'p-invalid': validationErrors.agreeWithRules }"
          />
          <label
            for="agree-with-rules-o1"
            class="block text-900 font-medium ml-2"
            >I agree with the order processing rules</label
          >
          <br />
          <small class="p-error">{{
            validationErrors.agreeWithRules || '&nbsp;'
          }}</small>
        </div>

        <div
          class="flex flex-wrap justify-content-between align-content-center"
        >
          <Button
            label="Return to Cart"
            icon="pi pi-times"
            class="w-5"
            severity="danger"
            @click="onRouteTo('Cart')"
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
