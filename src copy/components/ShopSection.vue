<template>
  <div class="container-fluid mx-auto bg-black p-4">
    <h1 class="text-white text-3xl text-center mb-6">Our Products</h1>

    <!-- Grid for products -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div v-for="(product, index) in productStore.products" :key="index"
        class="w-full border rounded-lg p-4 bg-gray-800 shadow-lg">
        <!-- Image Carousel Section -->
        <div class="h-48 bg-gray-200 relative mb-4">
          <div class="absolute inset-0 flex items-center justify-between z-10">
            <!-- Previous Button -->
            <button class="p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition"
              @click="prevImage(index)">
              &#9664;
            </button>
            <!-- Next Button -->
            <button class="p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition"
              @click="nextImage(index)">
              &#9654;
            </button>
          </div>
          <!-- Carousel Image -->
          <img :src="`http://localhost:3005/${product.images[currentImageIndex[index]]}`" alt="Product image"
            class="w-full h-full object-cover rounded-md" />
        </div>

        <!-- Product Details -->
        <h2 class="text-white text-lg font-semibold truncate">{{ product.title }}</h2>
        <p class="text-red-400 font-bold">{{ product.price }} $</p>
        <p class="text-gray-300 text-sm mt-2 truncate">{{ product.description }}</p>
        <button @click="addToCart(product)"
          class="mt-4 text-white bg-red-600 px-4 py-2 rounded-md hover:bg-red-500 transition">
          Buy
        </button>
      </div>
    </div>

    <!-- Cart Section -->
    <div class="mt-8 bg-gray-900 p-4 rounded-lg shadow-lg">
      <h2 class="text-white text-2xl mb-4">Your Cart</h2>
      <div v-if="cart.length > 0">
        <ul>
          <li v-for="(item, index) in cart" :key="index"
            class="flex justify-between items-center mb-2 p-2 bg-gray-800 rounded-lg">
            <span class="text-white">{{ item.title }}</span>
            <span class="text-red-400 font-bold">{{ item.price }} $</span>
            <button @click="removeFromCart(index)" class="text-white bg-red-600 px-2 py-1 rounded-md hover:bg-red-500">
              Remove
            </button>
          </li>
        </ul>
        <div class="mt-4">
          <p class="text-white font-semibold">Total: {{ cartTotal }} $</p>
          <button @click="showClientForm = true"
            class="mt-4 text-white bg-green-600 px-4 py-2 rounded-md hover:bg-green-500">
            Checkout
          </button>
        </div>
      </div>
      <div v-else>
        <p class="text-gray-400">Your cart is empty.</p>
      </div>
    </div>

    <!-- Client Information Modal -->
    <div v-if="showClientForm" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
      <div class="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 class="text-black text-xl font-semibold mb-4">Client Information</h2>
        <form @submit.prevent="submitOrder">
          <div class="mb-4">
            <label for="clientName" class="block text-sm font-medium text-gray-700">Name</label>
            <input v-model="clientName" id="clientName" type="text" required
              class="w-full p-2 border border-gray-300 rounded-lg" />
          </div>
          <div class="mb-4">
            <label for="clientTelegram" class="block text-sm font-medium text-gray-700"> Telegram </label>
            <input v-model="clientTelegram" id="clientTelegram" type="number" required
              class="w-full p-2 border border-gray-300 rounded-lg" />
          </div>
          <div class="mb-4">
            <label for="clientWhatsapp" class="block text-sm font-medium text-gray-700">Whatsapp</label>
            <input v-model="clientWhatsapp" id="clientWhatsapp" type="number" required
              class="w-full p-2 border border-gray-300 rounded-lg" />
          </div>
          <div class="mb-4">
            <label for="clientLocation" class="block text-sm font-medium text-gray-700"> Location </label>
            <input v-model="clientLocation" id="clientLocation" type="text" required
              class="w-full p-2 border border-gray-300 rounded-lg" />
          </div>
          <button type="submit" class="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-500">
            Submit Order
          </button>
        </form>
        <button @click="showClientForm = false"
          class="mt-4 w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-500">
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { useProductStore } from '../stores/productStore'; // Import the product store
import { useOrderStore } from '../stores/orderStore'; // Import the order store
import Swal from "sweetalert2";
// Initialize the product store
const productStore = useProductStore();
const orderStore = useOrderStore();

// Reactive variables
const products = ref([]);
const cart = ref([]);
const currentImageIndex = ref([]); // Carousel index for each product

// Modal visibility
const showClientForm = ref(false);

// Client information form data
const clientName = ref('');
const clientTelegram = ref(null);
const clientWhatsapp = ref(null);
const clientLocation = ref('');

// ----------------------------------------------
// Carousel Functionality
// ----------------------------------------------
// Navigate to the previous image in the carousel
const prevImage = (index) => {
  if (currentImageIndex.value[index] > 0) {
    currentImageIndex.value[index]--;
  } else {
    currentImageIndex.value[index] = products.value[index].images.length - 1;
  }
};

// Navigate to the next image in the carousel
const nextImage = (index) => {
  if (currentImageIndex.value[index] < products.value[index].images.length - 1) {
    currentImageIndex.value[index]++;
  } else {
    currentImageIndex.value[index] = 0;
  }
};

// Ensure carousel indices are correctly initialized when products are loaded
const initializeCarousel = () => {
  currentImageIndex.value = products.value.map(() => 0); // Reset indices for all products
};

// ----------------------------------------------
// Cart Functionality
// ----------------------------------------------
const cartTotal = computed(() =>
  cart.value.reduce((total, product) => total + parseFloat(product.price), 0)
);

const addToCart = (product) => {
  cart.value.push(product);
};

const removeFromCart = (index) => {
  cart.value.splice(index, 1);
};

// ----------------------------------------------
// Order Submission
// ----------------------------------------------
const submitOrder = async () => {
  if (cart.value.length === 0) {
    alert('Your cart is empty. Please add items to proceed.');
    return;
  }

  // Validate client information
  if (!clientName.value.trim() || !clientWhatsapp.value || !clientLocation.value.trim()) {
    alert('All required fields must be filled out.');
    return;
  }

  try {
    // Prepare payload
    const payload = {
      items: cart.value.map((item) => ({
        title: item.name, // Ensure `name` is mapped correctly to `title`
        price: item.price,
      })),
      clientName: clientName.value.trim(),
      clientTelegram: clientTelegram.value || null, // Optional field
      clientWhatsapp: clientWhatsapp.value,
      clientLocation: clientLocation.value.trim(),
    };

    // Send the order (replace with actual API call)
    console.log('Order payload:', payload);
    const response = await axios.post('http://localhost:3005/api/orders', payload);
    if (response.status !== 201) {
      throw new Error('Failed to place order');
    } else if (response.status === 201) {
      console.log('Order successfully placed:', response.data);
      orderStore.newOrder(response.data);
      // Success response handling
      Swal.fire({
        icon: 'success',
        title: 'Order placed!',
        text: 'Your order has been successfully placed.',
      });

    }

    cart.value = []; // Clear the cart
    showClientForm.value = false; // Close the modal
  } catch (error) {
    console.error('Error placing order:', error.response?.data || error.message || error);
    alert('Failed to place the order. Please try again later.');
  }
};

// ----------------------------------------------
// Fetch Products on Mount
// ----------------------------------------------
onMounted(() => {
  // Fetch products from the store if not already loaded
  if (!productStore.products || productStore.products.length === 0) {
    productStore.fetchProducts().then(() => {
      products.value = productStore.products; // Set local products
      initializeCarousel(); // Initialize carousel indices
    });
  } else {
    products.value = productStore.products; // Set local products
    initializeCarousel(); // Initialize carousel indices
  }
});
</script>
