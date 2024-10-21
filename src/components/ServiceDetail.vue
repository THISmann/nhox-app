<template>
    <div class="container-fluid bg-black p-2">
        <div class="grid grid-cols-2 gap-5">
            <div class="col-span-1">
                <img :src="img_edit"  ç>
            </div>
            <div class="col-span-1">
                <h1 class="text-white"> hello World
                </h1>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import img_edit from "../assets/bg/img00.png"
</script>