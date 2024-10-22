<template>
  <div class="container-fluid bg-black p-4 md:p-8">
    <!-- Grid for services -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Motion Graphics -->
      <div class="bg-gray-800 rounded-lg p-4 flex flex-col items-center text-center shadow-lg">
        <!-- Icon for Motion Graphics -->
        <div class="mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.341a8 8 0 11-10.857 0M12 4v8l3 3m6 6v-2a2 2 0 00-2-2h-2M6 18a2 2 0 00-2 2v2m0-2a2 2 0 012-2h2m6-10v2a2 2 0 012-2h2" />
          </svg>
        </div>
        <div>
          <h1 class="text-white text-2xl font-semibold mb-2">Motion Graphics</h1>
          <p class="text-gray-400 text-base">
            Our team brings your clips to life with stunning motion graphics, sound effects, and smooth transitions. Expect eye-catching titles and green screen effects, delivering beyond your expectations.
          </p>
        </div>
      </div>
  
      <!-- Color Grading -->
      <div class="bg-gray-800 rounded-lg p-4 flex flex-col items-center text-center shadow-lg">
        <!-- Icon for Color Grading -->
        <div class="mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.55 4.55M12 4l7 7-7 7-7-7 7-7z" />
          </svg>
        </div>
        <div>
          <h1 class="text-white text-2xl font-semibold mb-2">Color Grading</h1>
          <p class="text-gray-400 text-base">
            Elevate your videos with professional color grading. From saturation to contrast, we enhance your video’s tone and storytelling for a captivating visual experience.
          </p>
        </div>
      </div>
  
      <!-- 2D Animation -->
      <div class="bg-gray-800 rounded-lg p-4 flex flex-col items-center text-center shadow-lg">
        <!-- Icon for 2D Animation -->
        <div class="mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12h3m3 0h12M5.29 17.29a1 1 0 011.41 0L10 20.59l4.88-4.88a1 1 0 111.41 1.41L10 23.41l-5.71-5.71a1 1 0 010-1.41z" />
          </svg>
        </div>
        <div>
          <h1 class="text-white text-2xl font-semibold mb-2">2D Animation</h1>
          <p class="text-gray-400 text-base">
            Specializing in engaging 2D animation, we create explainer videos that boost your sales and keep customers returning, no matter your industry.
          </p>
        </div>
      </div>
    </div>
  
    <!-- Get a Quote Button -->
    <div class="mt-8 flex justify-center">
      <button class="text-white bg-red-600 px-6 py-3 rounded-md hover:bg-red-500 transition-all">
        Get a Quote
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
</style>
