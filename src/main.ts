// src/main.js
import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import router from "./router";
import '@fortawesome/fontawesome-free/css/all.css'; 

import { createPinia } from 'pinia';

 

createApp(App).use(router).use(createPinia()).mount("#app"); 