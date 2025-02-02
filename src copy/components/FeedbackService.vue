<template>
  <div class="container-fluid bg-black p-4">
    <!-- Grid with responsive columns -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      <!-- Card Loop -->
      <div
        v-for="(card, index) in cards"
        :key="index"
        class="col-span-1"
      >
        <div class="border rounded-xl p-4 bg-gray-800 flex flex-col items-center text-center shadow-lg">
          <!-- SVG Icon -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-12 w-12 text-red-500 mb-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              :d="card.iconPath"
            />
          </svg>
          <!-- Card Title -->
          <h1 class="text-white text-lg font-semibold">
            {{ card.title }}
          </h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Array of card data
const cards = [
  {
    title: "Fast & Easy Workflow",
    iconPath:
      "M5 12H19M5 12h6m0 0L5 7m6 5L5 17m14-5H9",
  },
  {
    title: "Seamless Collaboration",
    iconPath:
      "M5 12h6m-6 0H19m-7 7l5-5m-5 5L5 7",
  },
  {
    title: "Real-time Updates",
    iconPath:
      "M12 4v16m8-8H4",
  },
  {
    title: "Secure Data Handling",
    iconPath:
      "M12 4v16m8-8H4",
  },
];
</script>

<style scoped>
</style>
