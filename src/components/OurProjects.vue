<template>
    <div class="grid grid-cols-1 md:grid-cols-3 bg-black gap-4 p-4">
        <div v-for="(image, index) in articles" :key="index"
            class="relative border rounded-lg mb-2 h-96 bg-cover bg-center"
            :style="{ backgroundImage: `url(${image.imgSrc})` }">

            <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div class="text-center">
                    <h1 class="text-white text-xl font-semibold mb-4">{{ image.title }}</h1>
                    <a :href="image.link" class="text-white underline">
                        Visit Link
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import img1 from '../assets/photos/photo01.jpg';
import img2 from '../assets/photos/photo02.jpg';
import img3 from '../assets/photos/photo03.jpg';
import img4 from '../assets/photos/photo04.jpg';
import img5 from '../assets/photos/photo05.png';
import img6 from '../assets/photos/photo07.png';
import { computed } from 'vue'; 

 
const projectImages = [
    { src: img1, alt: 'Advert', link: 'https://disk.yandex.ru/i/fm8PA2f0oJFYAg' },
    { src: img2, alt: 'music', link: 'https://disk.yandex.ru/i/rMYW4iVmyii4cA' },
    { src: img3, alt: 'Cultural event', link: 'https://disk.yandex.ru/i/4jLSzeX5EJw1YA' },
    { src: img4, alt: 'Clip ', link: 'https://disk.yandex.ru/i/gFQWA0SsfPIWJw' },
    { src: img5, alt: 'Church ', link: 'https://disk.yandex.ru/d/3Y0f1kPjTCKT7Q' },
    { src: img6, alt: 'Wedding', link: 'https://disk.yandex.ru/i/x8oI8a-as6OMZg' },
];

// Declare the reactive variable for articles
const articles = ref<any[]>([]);
 
// Method to fetch articles from the server
const fetchArticles = async () => {
  try {
    const response = await axios.get('http://localhost:3003/articles');
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