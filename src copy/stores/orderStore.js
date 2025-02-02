// stores/orderStore.js
import { defineStore } from 'pinia';

export const useOrderStore = defineStore('orderStore', {
  state: () => ({
    orders: [], // Liste des commandes
  }),

  actions: {
    setOrders(newOrders) {
      this.orders = newOrders;
    },

    updateOrderStatus(orderId, newStatus) {
      const orderIndex = this.orders.findIndex(order => order._id === orderId);
      if (orderIndex !== -1) {
        this.orders[orderIndex].status = newStatus;
      }
    },

    newOrder(order) {
      this.orders.push(order);
    }
  },

  getters: {
    groupedOrders: (state) => {
      const grouped = {
        'in progress': [],
        done: [],
        cancel: [],
      };

      state.orders.forEach((order) => {
        grouped[order.status]?.push(order);
      });

      return Object.entries(grouped).map(([status, orders]) => ({
        status,
        orders,
      }));
    },

    // Filter orders by a specific date
    filterOrdersByDate: (state) => (date) => {
      return state.orders.filter((order) => {
        const orderDate = new Date(order.createdAt).toISOString().split('T')[0];
        const filterDate = new Date(date).toISOString().split('T')[0];
        return orderDate === filterDate;
      });
    },

    // Filter orders from the last week
    filterOrdersLastWeek: (state) => {
      const now = new Date();
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(now.getDate() - 7);

      return state.orders.filter((order) => {
        const orderDate = new Date(order.createdAt);
        return orderDate >= oneWeekAgo && orderDate <= now;
      });
    },

    // Filter orders from the last month
    filterOrdersLastMonth: (state) => {
      const now = new Date();
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(now.getMonth() - 1);

      return state.orders.filter((order) => {
        const orderDate = new Date(order.createdAt);
        return orderDate >= oneMonthAgo && orderDate <= now;
      });
    },

    // Filter orders from the last 3 months
    filterOrdersLast3Months: (state) => {
      const now = new Date();
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(now.getMonth() - 3);

      return state.orders.filter((order) => {
        const orderDate = new Date(order.createdAt);
        return orderDate >= threeMonthsAgo && orderDate <= now;
      });
    },
  },
});