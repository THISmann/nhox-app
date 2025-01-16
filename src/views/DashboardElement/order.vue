<template>
  <div class="container mx-auto p-6 bg-gray-100">
    <h1 class="text-3xl font-bold text-center mb-6">Order Management</h1>

    
    <filterOrder /> 
    <!-- Status-Based Sections -->
    <div v-for="statusGroup in groupedOrders" :key="statusGroup.status" class="mb-8">
      <!-- Section Header -->
      <h2
        :class="[
          'text-xl font-bold mb-4 text-center',
          statusHeaderClass(statusGroup.status),
        ]"
      >
        {{ capitalize(statusGroup.status) }} Orders
      </h2>

      <!-- Order Cards -->
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="order in statusGroup.orders"
          :key="order._id"
          :class="['p-4 rounded-lg shadow-md', statusCardClass(order.status)]"
        >
          <!-- Order Info -->
          <h3 class="text-lg font-bold mb-2">Order #{{ order._id }}</h3>
          <p class="text-sm mb-4">
            <strong>Created At:</strong> {{ formatDate(order.createdAt) }}
          </p>
          <ul class="mb-4 text-sm">
            <li v-for="item in order.items" :key="item._id" class="text-gray-800">
              - {{ item.title }} ({{ item.price }})
            </li>
          </ul>
          <p class="text-sm mb-2"><strong>Client Name:</strong> {{ order.clientName }}</p>
          <p class="text-sm mb-2"><strong>Telegram:</strong> {{ order.clientTelegram }}</p>
          <p class="text-sm mb-2"><strong>WhatsApp:</strong> {{ order.clientWhatsapp }}</p>
          <p class="text-sm mb-2"><strong>Location:</strong> {{ order.clientLocation }}</p>

          <!-- Status Dropdown -->
          <div class="mb-2">
            <label for="status" class="block text-sm font-medium text-gray-600">Change Status:</label>
            <select
              v-model="order.status"
              @change="updateOrderStatus(order)"
              class="w-full border rounded-md p-2 mt-1"
            >
              <option value="in progress">In Progress</option>
              <option value="done">Done</option>
              <option value="cancel">Cancel</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { useOrderStore } from '../../stores/orderStore';
import filterOrder from './filterOrder.vue';

// Pinia Store
const orderStore = useOrderStore();

// Fetch Orders
const fetchOrders = async () => {
  try {
    const response = await axios.get('http://localhost:3005/api/orders');
    const fetchedOrders = response.data.map((order) => ({
      ...order,
      status: order.status || 'in progress', // Default status
    }));
    orderStore.setOrders(fetchedOrders);
  } catch (error) {
    console.error('Error fetching orders:', error);
  }
};

// Update Order Status
const updateOrderStatus = async (order) => {
  try {
    await axios.put(`http://localhost:3005/api/orders/${order._id}`, {
      status: order.status,
    });
    orderStore.updateOrderStatus(order._id, order.status);
    alert(`Order #${order._id} status updated to "${order.status}"`);
  } catch (error) {
    console.error('Error updating order status:', error);
    alert('Failed to update order status. Please try again.');
  }
};

// Grouped Orders (from Pinia store)
const groupedOrders = computed(() => orderStore.groupedOrders);

// Utility Functions
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
const formatDate = (date) => new Date(date).toLocaleString();

const statusCardClass = (status) => {
  switch (status) {
    case 'in progress':
      return 'bg-yellow-100 border border-yellow-400';
    case 'done':
      return 'bg-green-100 border border-green-400';
    case 'cancel':
      return 'bg-red-100 border border-red-400';
    default:
      return 'bg-gray-100 border border-gray-300';
  }
};

const statusHeaderClass = (status) => {
  switch (status) {
    case 'in progress':
      return 'text-yellow-500';
    case 'done':
      return 'text-green-500';
    case 'cancel':
      return 'text-red-500';
    default:
      return 'text-gray-500';
  }
};

// Fetch orders on mount
onMounted(fetchOrders);
</script>

<style scoped>
.container {
  background-color: #f9fafb;
}
</style>
