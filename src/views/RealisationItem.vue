<template>
    <div class="p-4">
      <h1 class="text-2xl font-bold text-gray-800 mb-4">{{ article?.title }}</h1>
      <p class="text-gray-600 mb-6">{{ article?.description }}</p>
      <p class="text-gray-700 mb-8">{{ article?.text }}</p>
  
      <h2 class="text-xl font-semibold text-gray-800 mb-4">Gallery</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="(image, index) in article?.gallery" :key="index" class="rounded-lg overflow-hidden shadow">
          <img :src="image" alt="Gallery image" class="w-full h-48 object-cover">
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import axios from 'axios';
  const route = useRoute();
  const article = ref({});
  
  // const fetchArticle = () => {
  //   // Simulate fetching article data based on the ID from params
  //   const articles = [
  //     {
  //       id: 0,
  //       title: "Article 1",
  //       description: "This is a short description of article 1.",
  //       text: "Full text for article 1 goes here.",
  //       gallery: [
  //         "https://via.placeholder.com/150",
  //         "https://via.placeholder.com/200",
  //         "https://via.placeholder.com/250",
  //       ]
  //     },
  //     {
  //       id: 1,
  //       title: "Article 2",
  //       description: "This is a short description of article 2.",
  //       text: "Full text for article 2 goes here.",
  //       gallery: [
  //         "https://via.placeholder.com/150",
  //         "https://via.placeholder.com/200",
  //         "https://via.placeholder.com/250",
  //       ]
  //     }
  //   ];
  //   article.value = articles.find(a => a.id === Number(route.params.id));
  // };

  // Method to fetch articles from the server
const fetchArticleById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:3005/api/articles/${id}`);
    // Assuming the API response contains an array of articles
    article.value = response.data;
    console.log(response.data);
  
  } catch (error) {
    console.error('Error fetching articles:', error);
  }
};
  
  onMounted(() => {
    fetchArticleById(route.params.id);
  });
  </script>
  
  <style>
  /* Add any additional styles if needed */
  </style>
  