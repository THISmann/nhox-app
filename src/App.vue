<template>
  <NavBar />
  <Header />
  <OurServices />
  <VideoSection />
  <OurProjects />
  <ServiceDetail />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavBar from './components/NavBar.vue';
import Header from './components/Header.vue';
import OurServices from './components/OurServices.vue';
import VideoSection from './components/VideoSection.vue';
import OurProjects from './components/OurProjects.vue';
import ServiceDetail from './components/ServiceDetail.vue';

export default defineComponent({
  name: 'App',
  components: {
    NavBar, Header, OurServices, VideoSection, OurProjects, ServiceDetail
  }
})
</script>
