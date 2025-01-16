<template>
  <div class="grid grid-cols-1 md:grid-cols-3 bg-black gap-4 p-4">
    <div
      v-for="(image, index) in articles"
      :key="index"
      class="relative border rounded-lg mb-2 h-96 overflow-hidden"
    >
      <!-- Image Section -->
      <img
        :src="image.gallery ? `http://localhost:3005/${image.gallery[0]}` : require('../assets/bg/service1.jpg')"
        alt="Article Image"
        class="w-full h-full object-cover"
      />

      <!-- Overlay Section -->
      <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div class="text-center">
          <h1 class="text-white text-xl font-semibold mb-4">{{ image.title }}</h1>
          <router-link
            :to="{ name: 'RealisationItem', params: { id: image._id } }"
            class="text-white underline"
          >
            Visit Link
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>



<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios'; 
import { computed } from 'vue'; 


 

// Declare the reactive variable for articles
const articles = ref<any[]>([]);

// Method to fetch articles from the server
const fetchArticles = async () => {
  try {
    const response = await axios.get('http://localhost:3005/api/articles');
    // Assuming the API response contains an array of articles
    articles.value = response.data;
    console.log(response.data);

  } catch (error) {
    console.error('Error fetching articles:', error);
  }
};


// Fetch the articles when the component is mounted
onMounted(() => {
  fetchArticles();
});
</script>

<style scoped>
/* Add any additional styling if needed */
</style>