<template>
    <div class="bg-black">
      <video
        ref="video"
        :src="videoSrc" 
        autoplay
        @dblclick="toggleFullScreen"
        class="video-player"
      ></video>
      <button @click="toggleFullScreen">Toggle Fullscreen</button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from "vue";
  import videoSrc from "../assets/photos/clips.mp4";
  
  // Props
  const props = defineProps<{
    videoSrc: string;
  }>();
  
  // Video element ref
  const video = ref<HTMLVideoElement | null>(null);
  
  // Fullscreen toggle function
  const toggleFullScreen = () => {
    if (video.value) {
      if (!document.fullscreenElement) {
        video.value.requestFullscreen().catch((err) => {
          console.error(`Error attempting to enable full-screen mode: ${err.message}`);
        });
      } else {
        document.exitFullscreen();
      }
    }
  };
  </script>
  
  <style scoped>
  .video-container {
    position: relative;
    width: 100%;
    max-width: 800px;
    margin: auto;
  }
  
  .video-player {
    width: 100%;
    height: auto;
    cursor: pointer;
  }
  </style>
  