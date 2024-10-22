<template>
    <div class="container-fluid bg-black py-8">
      <!-- Title Section -->
      <div class="mb-8">
        <h1 class="text-white text-center text-4xl md:text-5xl lg:text-7xl font-bold">OUR PROJECTS</h1>
        <h3 class="text-gray-300 text-center text-lg md:text-2xl">
          We believe our work speaks for itself. Browse our
        </h3>
        <h3 class="text-gray-300 text-center text-lg md:text-2xl">most recent projects below.</h3>
      </div>
  
      <!-- Project Grid Section -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        <!-- Large Card -->
        <div class="md:col-span-2 h-max">
          <div class="relative bg-gray-400 border rounded-lg h-80 md:h-full bg-cover bg-center" :style="bgStyle1">
            <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <h1 class="text-white text-2xl md:text-4xl font-bold">Hello World 2!</h1>
            </div>
          </div>
        </div>
        
        <!-- Right Column Cards -->
        <div class="md:col-span-1">
          <!-- Upper Small Card -->
          <div class="relative border rounded-lg mb-2 h-64 bg-cover bg-center" :style="bgStyle2">
            <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <h1 class="text-white text-xl font-semibold">Bonjour2 !!!</h1>
            </div>
          </div>
          <!-- Lower Small Card -->
          <div class="relative border rounded-lg mb-2 h-64 bg-cover bg-center" :style="bgStyle3">
            <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <h1 class="text-white text-xl font-semibold">Bonjour !!!</h1>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Second Row Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        <!-- Card 1 -->
        <div class="relative border rounded-lg mb-2 h-64 bg-cover bg-center" :style="bgStyle4">
          <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <h1 class="text-white text-xl font-semibold">Bonjour !!!</h1>
          </div>
        </div>
  
        <!-- Card 2 -->
        <div class="relative border rounded-lg mb-2 h-64 bg-cover bg-center" :style="bgStyle5">
          <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <h1 class="text-white text-xl font-semibold">Bonjour !!!</h1>
          </div>
        </div>
  
        <!-- Card 3 -->
        <div class="relative border rounded-lg mb-2 h-64 bg-cover bg-center" :style="bgStyle6">
          <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <h1 class="text-white text-xl font-semibold">Bonjour !!!</h1>
          </div>
        </div>
      </div>
  
      <!-- White Card Section -->
      <div class="flex justify-center mt-8">
        <div class="bg-white rounded-lg shadow-lg p-6 max-w-lg text-center">
          <h2 class="text-black text-2xl font-bold mb-4">Let's Work Together</h2>
          <p class="text-gray-600 text-base">
            Whether you need stunning video editing, color grading, or visual effects, we are ready to bring your project to life. Contact us today and let's make something great together.
          </p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import img1 from '../assets/photos/photo01.jpg';
  import img2 from '../assets/photos/photo02.jpg';
  import img3 from '../assets/photos/photo07.png';
  import img4 from '../assets/photos/photo04.jpg';
  import img5 from '../assets/photos/photo05.png';
  import img6 from '../assets/photos/photo06.png';
  import { computed } from 'vue';
  
  // Computed property for the background styles
  const bgStyle1 = computed(() => ({
    backgroundImage: `url(${img1})`,
  }));
  
  const bgStyle2 = computed(() => ({
    backgroundImage: `url(${img2})`,
  }));

  const bgStyle3 = computed(() => ({
    backgroundImage: `url(${img3})`,
  }));

  const bgStyle4 = computed(() => ({
    backgroundImage: `url(${img4})`,
  }));

  const bgStyle5 = computed(() => ({
    backgroundImage: `url(${img5})`,
  }));

  const bgStyle6 = computed(() => ({
    backgroundImage: `url(${img6})`,
  }));
  </script>
  
  <style scoped>
  /* Add additional styles if necessary */
  </style>
  