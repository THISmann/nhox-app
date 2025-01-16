// src/stores/orderStore.js
import { defineStore } from 'pinia';

export const useDataStore = defineStore('dataStore', {
  state: () => ({
    data: {
      today: ['Task 1', 'Task 2', 'Task 3'],
      week: ['Task A', 'Task B', 'Task C', 'Task D'],
      month: ['Project X', 'Project Y', 'Project Z'],
    },
  }),
  getters: {
    getDataByCriteria: (state) => (criteria) => state.data[criteria],
  },
});
 