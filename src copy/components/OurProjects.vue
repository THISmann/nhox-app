<template>
  <div class="grid grid-cols-1 md:grid-cols-3 bg-black gap-4 p-4">
    <!-- Loop through the articles from the store and display them -->
    <div
      v-for="(article, index) in articleStore.articles"
      :key="article._id"  
      class="relative border rounded-lg mb-2 h-96 overflow-hidden"
    >
      <!-- Image Section -->
      <img
        :src="article.gallery && article.gallery.length > 0
          ? `http://localhost:3005/${article.gallery[0]}`
          : require('../assets/bg/service1.jpg')"
        alt="Article Image"
        class="w-full h-full object-cover"
      />

      <!-- Overlay Section -->
      <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div class="text-center">
          <h1 class="text-white text-xl font-semibold mb-4">{{ article.title }}</h1>
          <router-link
            :to="{ name: 'RealisationItem', params: { id: article._id } }"
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
import { onMounted, ref, watch } from 'vue';
import { useArticleStore } from '../stores/articleStore'; // Import the article store

// Access the article store
const articleStore = useArticleStore();
const key = ref(0); // key to force re-render when articles change


watch(
  () => articleStore.articles, 
  (newArticles) => {
    console.log("Articles updated:", newArticles);
  },
  { immediate: true } // Cette option déclenche la mise à jour immédiate, au cas où la liste serait vide lors du premier chargement
);

// Fetch articles from the store when the component is mounted
onMounted(() => {
  articleStore.fetchArticles(true);
  // Ensure that articles are fetched from the API if not already loaded
  if (!articleStore.articles || articleStore.articles.length === 0) {
    articleStore.fetchArticles(); // This action fetches and sets articles in the store
  }
});
</script>

<style scoped>
/* Add any additional styling if needed */
</style>
