<template>
  <div class="container-fluid mx-auto bg-black p-4">
    <h1 class="text-white text-3xl text-center mb-6">Our Products</h1>
    
    <!-- Grid for products -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <!-- Loop through products dynamically -->
      <div
        v-for="(product, index) in products"
        :key="index"
        class="border rounded-lg p-4 bg-gray-800 shadow-lg"
      >
        <img :src="product.image" :alt="product.title" class="w-full h-48 rounded-md mb-4 object-cover" />
        <h2 class="text-white text-lg font-semibold">{{ product.title }}</h2>
        <p class="text-red-400 font-bold">{{ product.price }}</p>
        <p class="text-gray-300 text-sm mt-2">{{ product.description }}</p>
        <button
          @click="addToCart(product)"
          class="mt-4 text-white bg-red-600 px-4 py-2 rounded-md hover:bg-red-500"
        >
          Buy
        </button>
      </div>
    </div> 
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Define products as an array of objects
const products = ref([
  {
    title: 'Product 1',
    price: '$19.99',
    description: 'This is a short description of Product 1.',
    image: 'https://via.placeholder.com/300x200?text=Product+1',
  },
  {
    title: 'Product 2',
    price: '$29.99',
    description: 'This is a short description of Product 2.',
    image: 'https://via.placeholder.com/300x200?text=Product+2',
  },
  {
    title: 'Product 3',
    price: '$39.99',
    description: 'This is a short description of Product 3.',
    image: 'https://via.placeholder.com/300x200?text=Product+3',
  },
  {
    title: 'Product 4',
    price: '$49.99',
    description: 'This is a short description of Product 4.',
    image: 'https://via.placeholder.com/300x200?text=Product+4',
  },
  {
    title: 'Product 5',
    price: '$49.99',
    description: 'This is a short description of Product 4.',
    image: 'https://via.placeholder.com/300x200?text=Product+5',
  },
]);

// Define the cart as a reactive array
const cart = ref([]);

// Function to add items to the cart
function addToCart(product) {
  cart.value.push(product);
}
</script>

<style scoped>
</style>
