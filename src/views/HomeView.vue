<template>
  <NavBar />
  <Header />
  <OurServices />
  <VideoSection />
  <OurProjects />
  <ServiceDetail />
  <ServiceDescription />
  <FeedbackService />
  <ShopSection />
  <FooterSection />
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted } from 'vue';
import { useArticleStore } from '../stores/articleStore'; // Import the article store
import { useProductStore } from '../stores/productStore'; // Import the product store

// Import the components
import NavBar from '../components/NavBar.vue';
import Header from '../components/Header.vue';
import OurServices from '../components/OurServices.vue';
import VideoSection from '../components/VideoSection.vue';
import OurProjects from '../components/OurProjects.vue';
import ServiceDetail from '../components/ServiceDetail.vue';
import ServiceDescription from '../components/ServiceDescription.vue';
import FeedbackService from "../components/FeedbackService.vue";
import FooterSection from "../components/FooterSection.vue";
import ShopSection from "../components/ShopSection.vue"; 

// Access the stores
const articleStore = useArticleStore();
const productStore = useProductStore();

// articleStore.initBroadcastChannel(); 
// Fetch articles from the store when the component is mounted
// onMounted(() => {
//   articleStore.initBroadcastChannel(); // Initialiser le canal
// });

// onUnmounted(() => {
//   articleStore.destroyBroadcastChannel(); // Fermer le canal proprement
// });

</script>
