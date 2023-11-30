<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useForm } from 'vee-validate';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Spinner from '@/components/Spinner.vue';
import { authSignin, isUserAuthenticated } from '@/services/AuthService';

const validation = fieldName => value => {
  if (!value) return `${fieldName} required`;
  return /^[a-zA-Z0-9_@#%&\!\$\^\*\(\)\-]+$/.test(value)
    ? true
    : `${fieldName} contains invalid characters`;
};

const {
  handleSubmit,
  defineField,
  errors: validationErrors
} = useForm({
  validationSchema: {
    username: validation('Username'),
    password: validation('Password')
  }
});

const router = useRouter();
const [username, usernameAttrs] = defineField('username');
const [password, passwordAttrs] = defineField('password');

const isRequestRunning = ref();

const signin = handleSubmit(async values => {
  isRequestRunning.value = true;
  authSignin(values.username, values.password);
  setTimeout(() => {
    isRequestRunning.value = false;
    if (isUserAuthenticated()) {
      router.push({ name: 'ProductList' });
    }
  }, 1500);
});
</script>

<template>
  <div
    class="px-4 py-8 md:px-6 lg:px-8 flex align-items-center justify-content-center"
  >
    <div class="surface-card p-4 shadow-2 border-round w-full lg:w-4">
      <div class="text-center mb-5">
        <div class="text-900 text-3xl font-medium mb-3">DEMO SHOP</div>
        <span class="text-600 font-medium line-height-3"
          >Login to your personal account</span
        >
      </div>

      <form @submit.prevent="signin" @keyup.enter="signin">
        <div class="mb-3">
          <label for="email1" class="block text-900 font-medium mb-2"
            >Username</label
          >
          <InputText
            id="email1"
            type="text"
            class="w-full mb-1"
            :class="{ 'p-invalid': validationErrors.username }"
            v-model="username"
            v-bind="usernameAttrs"
            placeholder="Enter your username"
          />
          <small class="p-error">
            {{ validationErrors.username || '&nbsp;' }}
          </small>
        </div>

        <div class="mb-5">
          <label for="password1" class="block text-900 font-medium mb-2"
            >Password</label
          >
          <InputText
            id="password1"
            type="password"
            class="w-full mb-1"
            :class="{ 'p-invalid': validationErrors.password }"
            v-model="password"
            v-bind="passwordAttrs"
            placeholder="Enter your password"
          />
          <small class="p-error">
            {{ validationErrors.password || '&nbsp;' }}
          </small>
        </div>

        <Spinner v-if="isRequestRunning" />
        <Button
          v-if="!isRequestRunning"
          label="Sign in"
          icon="pi pi-user"
          class="w-full"
          type="submit"
        ></Button>
      </form>
    </div>
  </div>
</template>
