<template>
    <div class="container-fluid bg-black">
      <div class="p-4 md:p-8 h-full">
        <!-- Title section -->
        <div>
          <h1 class="text-red-600 text-center text-2xl md:text-4xl lg:text-5xl">
            Are You Looking For Professional Editors?
          </h1>
        </div>
  
        <!-- Welcome message section -->
        <div class="m-1 flex flex-col items-center">
          <h1 class="text-white text-center m-4 font-medium text-4xl md:text-7xl lg:text-9xl">
            WELCOME to
          </h1>
          <h1 class="text-white text-center m-4 font-black text-4xl md:text-7xl lg:text-9xl">
            <span>STUDIO NHOX</span>
          </h1>
        </div>
  
        <!-- Image section -->
        <div class="mt-4 flex justify-center">
          <img :src="imgHeader" alt="Studio Nhox" class="w-full md:w-2/3 lg:w-1/2 h-auto" />
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import imgHeader from "../assets/bg/header.png"
  </script>
  
  <style scoped>
  /* Add any specific styles if needed */
  </style>
  