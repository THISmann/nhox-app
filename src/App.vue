<script setup>
import { onMounted, onUnmounted } from 'vue';
import { useArticleStore } from './stores/articleStore';

const articleStore = useArticleStore();

onMounted(() => {
  articleStore.fetchArticles(); // Récupérer les articles existants
 // articleStore.connectToSSE(); // Connecter SSE
});

// onUnmounted(() => {
//   articleStore.disconnectSSE(); // Déconnecter SSE lors de la destruction
// });
</script>

<template>
  <router-view />
</template>
