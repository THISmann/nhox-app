<template>
    <div class="min-h-screen flex justify-center items-center bg-gray-100">
      <div class="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 class="text-2xl font-semibold mb-4">Login</h2>
        <form @submit.prevent="handleLogin">
          <div class="mb-4">
            <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
            <input
              v-model="username"
              type="text"
              id="username"
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
              required
              placeholder="Enter your username"
            />
          </div>
          <div class="mb-4">
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <input
              v-model="password"
              type="password"
              id="password"
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
              required
              placeholder="Enter your password"
            />
          </div>
          <div class="flex justify-end">
            <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-lg">Login</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  // Reactive state for the login form
  const username = ref('');
  const password = ref('');
  
  // Get the router instance
  const router = useRouter();
  
  // Handle login logic
  const handleLogin = () => {
    // Example hardcoded login credentials (replace with real authentication logic)
    const validUsername = 'admin';
    const validPassword = 'admin123';
  
    if (username.value === validUsername && password.value === validPassword) {
      // Store the logged-in state (can be Vuex or localStorage if needed)
      localStorage.setItem('isAuthenticated', 'true');
      router.push('/dashboard'); // Redirect to the admin page after login
    } else {
      alert('Invalid credentials');
    }
  };
  </script>
  
  <style scoped>
  /* You can add custom styles here */
  </style>
  