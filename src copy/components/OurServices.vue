<template>
  <div class="container-fluid">
    <div class="relative bg-black h-full py-12">
      <h1 class="text-white text-center font-bold text-2xl md:text-3xl lg:text-4xl m-3">
        Our POST-PRODUCTION VIDEO EDITING SERVICES INCLUDE
      </h1>

      <div class="grid grid-cols-1 md:grid-cols-4 bg-black gap-3 p-4">
        <div class="col-span-4 flex flex-wrap justify-center gap-8">
          <!-- Card Component -->
          <div
            v-for="(service, index) in services"
            :key="index"
            class="max-w-sm m-4 rounded-lg text-white overflow-hidden shadow-lg border-2 border-red-500 w-72"
          >
            <div class="flex items-center justify-center p-4">
              <img :src="service.img" :alt="service.title" class="w-16 h-16" />
            </div>
            <div class="px-6 py-4">
              <div class="font-bold text-xl mb-2 text-center">{{ service.title }}</div>
              <p class="text-gray-400 text-base">{{ service.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-center mt-8">
        <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
          Get a Quote
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import logo1 from "../assets/logo/bg-1.png";
import logo2 from "../assets/logo/bg-2.png";
import logo3 from "../assets/logo/bg-3.png";

// Service card data array
const services = [
  {
    img: logo1,
    title: "Longs Metrages & Films",
    description: "We provide top-notch editing for feature films, handling the most complex footage with precision."
  },
  {
    img: logo2,
    title: "Documentaries & Videos",
    description: "We craft compelling stories through professional documentary and video project editing."
  },
  {
    img: logo3,
    title: "Music Videos",
    description: "We add a creative flair to music videos with seamless edits, color grading, and visual effects."
  }
];
</script>

<style scoped></style>
