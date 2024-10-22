<template>
    <div class="container-fluid mx-auto bg-black p-4">
      <h1 class="text-white text-3xl text-center mb-6">Our Products</h1>
      
      <!-- Grid for products -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <!-- Product Card 1 -->
        <div class="border rounded-lg p-4 bg-gray-800 shadow-lg">
          <img :src="product1.image" alt="Product 1" class="w-full h-48 rounded-md mb-4 object-cover" />
          <h2 class="text-white text-lg font-semibold">{{ product1.title }}</h2>
          <p class="text-red-400 font-bold">{{ product1.price }}</p>
          <p class="text-gray-300 text-sm mt-2">{{ product1.description }}</p>
          <button @click="addToCart(product1)" class="mt-4 text-white bg-red-600 px-4 py-2 rounded-md hover:bg-red-500">
            Buy
          </button>
        </div>
  
        <!-- Product Card 2 -->
        <div class="border rounded-lg p-4 bg-gray-800 shadow-lg">
          <img :src="product2.image" alt="Product 2" class="w-full h-48 rounded-md mb-4 object-cover" />
          <h2 class="text-white text-lg font-semibold">{{ product2.title }}</h2>
          <p class="text-red-400 font-bold">{{ product2.price }}</p>
          <p class="text-gray-300 text-sm mt-2">{{ product2.description }}</p>
          <button @click="addToCart(product2)" class="mt-4 text-white bg-red-600 px-4 py-2 rounded-md hover:bg-red-500">
            Buy
          </button>
        </div>
  
        <!-- Product Card 3 -->
        <div class="border rounded-lg p-4 bg-gray-800 shadow-lg">
          <img :src="product3.image" alt="Product 3" class="w-full h-48 rounded-md mb-4 object-cover" />
          <h2 class="text-white text-lg font-semibold">{{ product3.title }}</h2>
          <p class="text-red-400 font-bold">{{ product3.price }}</p>
          <p class="text-gray-300 text-sm mt-2">{{ product3.description }}</p>
          <button @click="addToCart(product3)" class="mt-4 text-white bg-red-600 px-4 py-2 rounded-md hover:bg-red-500">
            Buy
          </button>
        </div>
  
        <!-- Product Card 4 -->
        <div class="border rounded-lg p-4 bg-gray-800 shadow-lg">
          <img :src="product4.image" alt="Product 4" class="w-full h-48 rounded-md mb-4 object-cover" />
          <h2 class="text-white text-lg font-semibold">{{ product4.title }}</h2>
          <p class="text-red-400 font-bold">{{ product4.price }}</p>
          <p class="text-gray-300 text-sm mt-2">{{ product4.description }}</p>
          <button @click="addToCart(product4)" class="mt-4 text-white bg-red-600 px-4 py-2 rounded-md hover:bg-red-500">
            Buy
          </button>
        </div>
      </div>
  
      <!-- Cart Section -->
      <div class="mt-8">
        <h2 class="text-white text-2xl mb-4">Selected Items</h2>
        <div v-if="cart.length === 0" class="text-gray-300">No items selected.</div>
        <ul class="bg-gray-800 p-4 rounded-lg">
          <li v-for="(item, index) in cart" :key="index" class="text-gray-300 flex justify-between mb-2">
            <span>{{ item.title }}</span>
            <span class="text-red-400 font-bold">{{ item.price }}</span>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  // Define product details using ref
  const product1 = ref({
    title: 'Product 1',
    price: '$19.99',
    description: 'This is a short description of Product 1.',
    image: 'https://via.placeholder.com/300x200?text=Product+3',
  });
  
  const product2 = ref({
    title: 'Product 2',
    price: '$29.99',
    description: 'This is a short description of Product 2.',
    image: 'https://via.placeholder.com/300x200?text=Product+3',
  });
  
  const product3 = ref({
    title: 'Product 3',
    price: '$39.99',
    description: 'This is a short description of Product 3.',
    image: 'https://via.placeholder.com/300x200?text=Product+3',
  });
  
  const product4 = ref({
    title: 'Product 4',
    price: '$49.99',
    description: 'This is a short description of Product 4.',
    image: 'https://via.placeholder.com/300x200?text=Product+4',
  });
  
  // Define the cart as a reactive array
  const cart = ref([]);
  
  // Function to add items to the cart
  function addToCart(product) {
    cart.value.push(product.value);
  }
  </script>
  
  <style scoped>
  </style>
  