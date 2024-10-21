<template>
    <div class="container-fluid bg-black">
        <div>
            <h1 class="text-white text-center text-7xl">OUR PROJECTS</h1>
            <h3 class="text-gray-300 text-center text-2xl">
                We believe our work speaks for itself. Browse our
            </h3>
            <h3 class="text-gray-300 text-center text-2xl">most recent projects below.</h3>
        </div>

        <div class="grid grid-cols-3 gap-4 p-4">
            <div class="col-span-2">
                <div class="bg-gray-400 border rounded-lg h-full bg-cover bg-cente" :style="bgStyle1">
                    <h1 class="text-white m-1">Hello World !</h1>
                </div>
            </div>
            <div class="col-span-1">
                <div>
                    <div class="border rounded-lg mb-2 h-64 bg-cover bg-center" :style="bgStyle1">
                        <h1 class="text-white m-1">Bonjour !!!</h1>
                    </div>
                    <div class="border rounded-lg mb-1 h-64 bg-cover bg-center" :style="bgStyle2">
                        <h1 class="text-white m-1">Bonjour !!!</h1>
                    </div>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-3 gap-4 p-4">
            <div class="col-span-1">
                <div class="border rounded-lg mb-2 h-64 bg-cover bg-center" :style="bgStyle1">
                    <h1 class="text-white m-1">Bonjour !!!</h1>
                </div>
            </div>
            <div class="col-span-1">
                <div class="border rounded-lg mb-2 h-64 bg-cover bg-center" :style="bgStyle1">
                    <h1 class="text-white m-1">Bonjour !!!</h1>
                </div>
            </div>
            <div class="col-span-1">
                <div class="border rounded-lg mb-2 h-64 bg-cover bg-center" :style="bgStyle1">
                    <h1 class="text-white m-1">Bonjour !!!</h1>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import img1 from '../assets/bg/service1.jpg';
import img2 from '../assets/bg/service2.jpg';
import { computed } from 'vue';

// Computed property for the background styles
const bgStyle1 = computed(() => ({
    backgroundImage: `url(${img1})`,
}));

const bgStyle2 = computed(() => ({
    backgroundImage: `url(${img2})`,
}));
</script>

<style scoped>
/* If you need to apply additional styles, you can do it here */
</style>