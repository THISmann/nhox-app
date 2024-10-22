<template>
    <div class="container-fluid bg-black p-8">
      <!-- Responsive grid: 1 column on small screens, 2 columns on larger screens -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <!-- Image column -->
        <div class="col-span-1 p-2">
          <img :src="img_edit" alt="Video Editing" class="w-full h-auto rounded-lg shadow-lg" />
        </div>
  
        <!-- Text content column -->
        <div class="col-span-1">
          <!-- Main Title -->
          <h1 class="text-white text-3xl md:text-4xl font-extrabold mb-4 leading-tight">
            Video Editing Services
          </h1>
  
          <!-- Subtitle -->
          <h2 class="text-red-500 text-2xl font-semibold mb-4">
            Enhance Your Videos with Our Professional Post-Production Services
          </h2>
  
          <!-- Description Text -->
          <p class="text-gray-300 text-lg mb-6">
            Transform your video into a masterpiece with our skilled post-production team! From wedding videos to corporate projects, we've got you covered. Our state-of-the-art tools like <span class="text-red-400 font-semibold">Adobe Premiere</span>, <span class="text-red-400 font-semibold">Davinci Resolve</span>, <span class="text-red-400 font-semibold">After Effects</span>, and <span class="text-red-400 font-semibold">Final Cut Pro</span> allow us to deliver exceptional results quickly.
          </p>
          
          <p class="text-gray-300 text-lg mb-8">
            With over <span class="text-red-400 font-semibold">50 happy clients</span> and hundreds of edited videos under our belt, trust us to bring your vision to life. Unleash the full potential of your raw footage with our top-notch video editing services.
          </p>
  
          <!-- Call-to-Action Button -->
          <button class="bg-red-500 hover:bg-red-600 text-white text-lg font-bold py-2 px-6 rounded-lg shadow-md transition duration-300 ease-in-out">
            Get a Free Quote
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import img_edit from "../assets/bg/img00.png";
  </script>
  
  <style scoped>
  /* Add styles here if needed */
  </style>
  