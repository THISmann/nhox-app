<template>
    <div class="bg-black p-4">
      <!-- Responsive grid with 5 columns on large screens, fewer on smaller ones -->
     
  
      <!-- Footer Section -->
      <footer class="bg-gray-800 p-8 mt-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <!-- Contact Info -->
          <div>
            <h2 class="text-white text-lg font-semibold mb-4">Contact Us</h2>
            <ul class="text-gray-400">
              <li>Phone: +123 456 7890</li>
              <li>Email: info@example.com</li>
              <li>Address: 1234 Main St, City, Country</li>
            </ul>
          </div>
  
          <!-- Map Placeholder -->
          <div>
            <h2 class="text-white text-lg font-semibold mb-4">Our Location</h2>
            <div class="w-full h-40 bg-gray-700 rounded-lg text-gray-400 flex items-center justify-center">
              <p>Map Placeholder</p>
            </div>
          </div>
  
          <!-- Social Media Links -->
          <div>
            <h2 class="text-white text-lg font-semibold mb-4">Follow Us</h2>
            <ul class="text-gray-400 space-y-2">
              <li><a href="#" class="hover:text-red-500 transition">Facebook</a></li>
              <li><a href="#" class="hover:text-red-500 transition">Twitter</a></li>
              <li><a href="#" class="hover:text-red-500 transition">Instagram</a></li>
              <li><a href="#" class="hover:text-red-500 transition">LinkedIn</a></li>
            </ul>
          </div>
  
          <!-- Newsletter Signup -->
          <div>
            <h2 class="text-white text-lg font-semibold mb-4">Newsletter</h2>
            <form>
              <input type="email" placeholder="Your email" class="w-full p-2 mb-4 rounded-lg text-black" />
              <button class="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg w-full">
                Subscribe
              </button>
            </form>
          </div>
        </div>
  
        <div class="text-center text-gray-500 mt-8">
          &copy; 2024 Your Company. All rights reserved.
        </div>
      </footer>
    </div>
  </template>
  
  <script setup lang="ts">
  </script>
  
  <style scoped>
  /* Add styles here if needed */
  </style>
  