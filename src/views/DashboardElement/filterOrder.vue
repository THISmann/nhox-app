<template>
    <div class="max-w-7xl mx-auto p-6">
        <!-- Filter Buttons -->
        <div class="flex flex-wrap justify-center gap-4 mb-8">
            <button v-for="criterion in criteria" :key="criterion" @click="setActiveCriterion(criterion)" :class="[
                'px-6 py-2 rounded-lg font-semibold transition',
                criterion === activeCriterion
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 hover:bg-gray-300',
            ]">
                {{ criterion }}
            </button>
        </div>

        <!-- Orders Section -->
        <div v-for="statusGroup in groupedOrders" :key="statusGroup.status" class="mb-12">
            <!-- Status Header -->
            <h2 :class="[
                'text-2xl font-bold mb-6 text-center',
                statusHeaderClass(statusGroup.status),
            ]">
                {{ capitalize(statusGroup.status) }} Orders
            </h2>

            <!-- Order Cards -->
            <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <div v-for="order in statusGroup.orders" :key="order._id"
                    class="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
                    <!-- Order Details -->
                    <h3 class="text-sm font-bold mb-2 text-gray-800">Order #{{ order._id }}</h3>
                    <p class="text-sm text-gray-600 mb-4">
                        <strong>Created At:</strong> {{ formatDate(order.createdAt) }}
                    </p>

                    <!-- Order Items -->
                    <ul class="mb-4 text-sm text-gray-800">
                        <li v-for="item in order.items" :key="item._id">
                            - {{ item.title }} ({{ item.price }})
                        </li>
                    </ul>

                    <!-- Client Information -->
                    <div class="text-sm text-gray-700 space-y-1">
                        <p><strong>Client Name:</strong> {{ order.clientName }}</p>
                        <p><strong>Telegram:</strong> {{ order.clientTelegram }}</p>
                        <p><strong>WhatsApp:</strong> {{ order.clientWhatsapp }}</p>
                        <p><strong>Location:</strong> {{ order.clientLocation }}</p>

                        <!-- Status Dropdown -->
                        <div class="mb-2">
                            <label for="status" class="block text-sm font-medium text-gray-600">Change Status:</label>
                            <select v-model="order.status" @change="updateOrderStatus(order)"
                                class="w-full border rounded-md p-2 mt-1">
                                <option value="in progress">In Progress</option>
                                <option value="done">Done</option>
                                <option value="cancel">Cancel</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useOrderStore } from '../../stores/orderStore';
import axios from 'axios';
// Import order store
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


// Criteria for filtering
const criteria = ['today', 'week', 'month', '3 months'];

// Active criterion
const activeCriterion = ref('today');

// Dynamically filter orders based on the active criterion
const filteredOrders = computed(() => {
    switch (activeCriterion.value) {
        case 'today':
            const today = new Date().toISOString().split('T')[0];
            return orderStore.filterOrdersByDate(today); // Call the specific getter
        case 'week':
            return orderStore.filterOrdersLastWeek;
        case 'month':
            return orderStore.filterOrdersLastMonth;
        case '3 months':
            return orderStore.filterOrdersLast3Months;
        default:
            return [];
    }
});

// Group the filtered orders by status
const groupedOrders = computed(() => {
    const grouped = {
        'in progress': [],
        done: [],
        cancel: [],
    };

    filteredOrders.value.forEach((order) => {
        grouped[order.status]?.push(order);
    });

    return Object.entries(grouped).map(([status, orders]) => ({
        status,
        orders,
    }));
});

// Set the active criterion
const setActiveCriterion = (criterion) => {
    activeCriterion.value = criterion;
};

// Utility functions
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
const formatDate = (date) => new Date(date).toLocaleString();

// Add statusHeaderClass function
const statusHeaderClass = (status) => {
    switch (status) {
        case 'in progress':
            return 'text-blue-500';
        case 'done':
            return 'text-green-500';
        case 'cancel':
            return 'text-red-500';
        default:
            return 'text-gray-500';
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

// Fetch orders on mount
onMounted(fetchOrders);
</script>