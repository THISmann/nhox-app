<template>
  <div class="container-fluid mx-auto bg-black p-4">
    <h1 class="text-white text-3xl text-center mb-6">Our Products 12</h1>
    
    <!-- Grid for products -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <!-- Loop through products dynamically -->
      <div
        v-for="(product, index) in products"
        :key="index"
        class="border rounded-lg p-4 bg-gray-800 shadow-lg"
      >
        <img :src="`http://localhost:3005/uploads/${product.image}`" :alt="product.title" class="w-full h-48 rounded-md mb-4 object-cover" />
        <h2 class="text-white text-lg font-semibold">{{ product.title }} </h2>
        <p class="text-red-400 font-bold">{{ product.price }} $</p>
        <p class="text-gray-300 text-sm mt-2">{{ product.description }}</p>
        <button
          @click="addToCart(product)"
          class="mt-4 text-white bg-red-600 px-4 py-2 rounded-md hover:bg-red-500"
        >
          Buy
        </button>
      </div>
    </div> 

    <!-- Cart Section -->
    <div class="mt-8 bg-gray-900 p-4 rounded-lg shadow-lg">
      <h2 class="text-white text-2xl mb-4">Your Cart</h2>
      <div v-if="cart.length > 0">
        <ul>
          <li
            v-for="(item, index) in cart"
            :key="index"
            class="flex justify-between items-center mb-2 p-2 bg-gray-800 rounded-lg"
          >
            <span class="text-white">{{ item.name }}</span>
            <span class="text-red-400 font-bold">{{ item.price }} $</span>
            <button
              @click="removeFromCart(index)"
              class="text-white bg-red-600 px-2 py-1 rounded-md hover:bg-red-500"
            >
              Remove
            </button>
          </li>
        </ul>
        <div class="mt-4">
          <p class="text-white font-semibold">
            Total: {{ cartTotal }} $
          </p>
          <button
            @click="checkout"
            class="mt-4 text-white bg-green-600 px-4 py-2 rounded-md hover:bg-green-500"
          >
            Checkout
          </button>
        </div>
      </div>
      <div v-else>
        <p class="text-gray-400">Your cart is empty.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';

// Declare the reactive variable for products
const products = ref([]);

// Fetch products from the server
const fetchProducts = async () => {
  try {
    const response = await axios.get('http://localhost:3005/api/products');
    products.value = response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

// Reactive array for the cart
const cart = ref([]);

// Computed property to calculate the total price of the cart
const cartTotal = computed(() =>
  cart.value.reduce((total, product) => total + parseFloat(product.price), 0)
);

// Add a product to the cart
function addToCart(product) {
  cart.value.push(product);
}

// Remove a product from the cart
function removeFromCart(index) {
  cart.value.splice(index, 1);
}

// Simulate checkout
// Simulate checkout
async function checkout() {
  if (cart.value.length === 0) {
    alert('Your cart is empty. Please add items to proceed.');
    return;
  }

  try {
    // Validate cart items to ensure title and price are present
    const payload = {
      items: cart.value.map((item) => {
        if (!item.name || !item.price) {
          throw new Error('Cart item is missing required fields: title or price.');
        }
        return {
          title: item.name,
          price: item.price,
        };
      }),
    };

    const response = await axios.post('http://localhost:3005/api/orders', payload);
    alert('Order successfully placed!');
    cart.value = []; // Clear the cart after successful checkout
  } catch (error) {
    console.error('Error placing order:', error.message || error);
    alert(
      'Failed to place the order. Ensure all cart items have valid titles and prices, and try again.'
    );
  }
}


// Fetch products when the component is mounted
onMounted(() => {
  fetchProducts();
});
</script>

<style scoped>
</style>
