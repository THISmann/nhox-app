<template>
  <div class="grid grid-cols-1 md:grid-cols-3 bg-black gap-4 p-4">
    <div
      v-for="(article, index) in articleStore.articles"
      :key="article._id"
      class="relative border rounded-lg mb-2 h-96 overflow-hidden"
    >
      <img
        :src="article.gallery && article.gallery.length > 0
          ? `http://localhost:3005/${article.gallery[0]}`
          : require('@/assets/bg/service1.jpg')"
        alt="Article Image"
        class="w-full h-full object-cover"
      />
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
import { onMounted, onBeforeUnmount } from 'vue';
import { useArticleStore } from '../stores/articleStore';

// Import the store
const articleStore = useArticleStore();

// SSE event source reference
let eventSource: EventSource | null = null;

// Function to handle incoming SSE messages
const handleSSEMessage = (event: MessageEvent) => {
  try {
    const message = JSON.parse(event.data);

    // Handle different Redis events
    if (message.action === 'create') {
      articleStore.articles.push(message.article);
    } else if (message.action === 'update') {
      const index = articleStore.articles.findIndex(article => article._id === message.article._id);
      if (index !== -1) articleStore.articles[index] = message.article;
    } else if (message.action === 'delete') {
      articleStore.articles = articleStore.articles.filter(article => article._id !== message.articleId);
    }
  } catch (err) {
    console.error('Error processing SSE message:', err);
  }
};

// Lifecycle hooks
onMounted(async () => {
  // Initialize the store and fetch articles
  articleStore.initStore();
  await articleStore.fetchArticles();

  // Establish the SSE connection
  eventSource = new EventSource('http://localhost:3003/events');

  // Listen for messages from the server
  eventSource.addEventListener('message', handleSSEMessage);

  // Handle errors
  eventSource.onerror = (err) => {
    console.error('SSE connection error:', err);
    if (eventSource) {
      eventSource.close();
    }
  };
});

onBeforeUnmount(() => {
  // Clean up the SSE connection when the component is unmounted
  if (eventSource) {
    eventSource.close();
  }
});
</script>